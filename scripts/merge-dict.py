#!/usr/bin/env python3
"""Atomic JSON deep-merge tool for i18n dictionary patches.

Usage:
  python3 scripts/merge-dict.py --target src/i18n/dictionaries/zh.json --patch scripts/patches/zh-methodology.json
  python3 scripts/merge-dict.py --target zh.json --patch zh-patch.json --overwrite  # overwrite existing keys
"""
import argparse, json, os, sys, tempfile

def deep_merge(base, patch, overwrite=False):
    """Recursively merge patch into base. Only adds new keys unless overwrite=True."""
    for key, value in patch.items():
        if key in base and isinstance(base[key], dict) and isinstance(value, dict):
            deep_merge(base[key], value, overwrite)
        elif key not in base or overwrite:
            base[key] = value
    return base

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--target", required=True, help="Target JSON file to patch")
    parser.add_argument("--patch", required=True, help="Patch JSON file with new keys")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite existing keys")
    args = parser.parse_args()

    with open(args.target, "r", encoding="utf-8") as f:
        target = json.load(f)
    with open(args.patch, "r", encoding="utf-8") as f:
        patch = json.load(f)

    merged = deep_merge(target, patch, args.overwrite)

    # Write to temp, validate, then atomic rename
    fd, tmp = tempfile.mkstemp(suffix=".json", dir=os.path.dirname(args.target))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(merged, f, ensure_ascii=False, indent=2)
            f.write("\n")
        # Validate
        with open(tmp, "r", encoding="utf-8") as f:
            json.load(f)
        os.replace(tmp, args.target)
        print(f"✓ Merged {args.patch} → {args.target}")
    except Exception as e:
        os.unlink(tmp)
        print(f"✗ Failed: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
