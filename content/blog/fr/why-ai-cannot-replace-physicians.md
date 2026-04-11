---
title: "Pourquoi l'IA ne peut pas remplacer les medecins en sante"
description: "La question n'est pas de savoir si l'IA peut remplacer les medecins — c'est ce que font les medecins qui ne peut pas etre delegue. Pourquoi l'IA devrait soutenir, pas se substituer."
date: "2026-03-22"
author: "Dr. Jee Hoon Ju"
category: "technology"
tags: ["AI in healthcare", "AI replace doctors", "physician AI", "medical AI", "agentic AI", "healthcare technology", "medical decision making", "AI limitations", "patient safety"]
coverImage: "/assets/blog/why-ai-cannot-replace-physicians-cover.webp"
published: true
---

## La mauvaise question

Chaque semaine, quelqu'un publie un article demandant si l'IA remplacera les medecins.

Les articles suivent une structure familiere : une etude de reference montre une IA surpassant des internes a un examen de specialite ; un modele diagnostique atteint une precision de niveau radiologue sur une tache d'imagerie specifique ; un modele de langage genere des comptes rendus de sortie plus vite que des medecins juniors. L'implication, declaree ou sous-entendue, est que la trajectoire est claire. L'automatisation arrive. Les medecins devraient se preparer.

J'ai passe les dernieres annees en tant que medecin en exercice, et la derniere annee a construire des systemes d'accueil IA pour la pratique medicale. J'ai examine la question sous tous les angles possibles. Et je suis arrive a la conviction que tous ceux qui demandent « l'IA remplacera-t-elle les medecins ? » posent la mauvaise question.

La bonne question est celle-ci : **que fait concretement le medecin qui ne peut pas etre delegue ?**

La reponse a cette question change tout sur la facon dont nous devrions construire des systemes d'IA pour la sante.

## Ce que fait reellement un medecin

Quand je vois un patient, je ne traite pas principalement de l'information. N'importe quel modele suffisamment entraine peut le faire plus vite et avec plus d'ampleur que moi.

Ce que je fais est quelque chose de different. Je suis temoin d'une personne dans l'incertitude, je construis un cadre a travers lequel sa situation devient lisible, et — point crucial — je me place dans une position de responsabilite pour ce qui se passe ensuite.

Ce troisieme composant n'est pas une ceremonie. Il est structurel.

Quand un medecin signe son nom sur un diagnostic, une recommandation ou un plan, il n'enregistre pas simplement une conclusion. Il accepte une chaine de consequences — juridiques, professionnelles, ethiques — qui ne peut pas etre transferee a une machine. Un medecin peut se tromper. Un medecin peut etre tenu responsable de s'etre trompe. Un medecin peut perdre sa licence, faire face a des poursuites et porter le poids moral des resultats qu'il a causes. Cette boucle de responsabilite n'est pas accessoire a la medecine. Elle est la medecine.

Un modele d'IA, aussi precis soit-il, ne peut pas occuper cette position. Non pas parce que le modele manque de capacite, mais parce que la responsabilite necessite un sujet — une entite avec un enjeu dans le resultat, avec quelque chose a perdre, avec la capacite de porter la responsabilite dans le temps.

Ce n'est pas une note de bas de page philosophique. C'est la raison structurelle pour laquelle l'IA ne peut pas remplacer les medecins.

## Les capacites reelles de l'IA

Rien de tout cela ne signifie que l'IA est sans pertinence pour la medecine. C'est le contraire qui est vrai. Mais sa pertinence se situe dans un registre different de ce que la plupart des discussions reconnaissent.

Ce que l'IA peut faire extraordinairement bien :

**Structurer l'information fragmentee.** Un patient arrivant pour une consultation complexe apporte souvent des annees de dossiers eparpilles, de diagnostics partiels et d'historiques mal documentes. L'IA peut ingerer cette fragmentation et faire emerger un tableau coherent bien plus vite que tout examinateur humain.

**Identifier ce qui manque.** L'un des echecs les plus constants dans l'accueil clinique n'est pas de collecter les mauvaises informations — c'est de ne pas remarquer que des informations critiques sont absentes. L'IA peut signaler les lacunes systematiquement, sans la fatigue qui cause les oublis des examinateurs humains.

**Maintenir la continuite dans le temps.** Le suivi post-traitement necessite une attention constante sur des semaines ou des mois. L'IA peut soutenir cette attention sans degradation. Elle ne se fatigue pas. Elle n'oublie pas de relancer. (C'est ainsi que nous avons concu le [processus AetherHeal](/fr/how-it-works) — l'IA gere la continuite tandis que les medecins detiennent l'autorite.)

**Reduire les barrieres linguistiques et culturelles.** Dans les contextes medicaux internationaux, la mauvaise communication n'est pas juste un desagrement — c'est un probleme de securite des patients. L'IA peut servir d'intermediaire entre les langues avec une coherence qu'aucun coordinateur humain ne peut egalier a grande echelle.

Ce sont des capacites reelles et significatives. Mais remarquez ce qui les relie toutes : ce sont des capacites de *preparation et de soutien*, pas de *jugement et de responsabilite*. L'IA est extraordinaire pour rendre le travail du medecin plus complet, plus precis et plus scalable. Elle est structurellement incapable de remplacer la position du medecin dans la chaine de responsabilite.

## Ou les systemes d'IA echouent en sante

Le mode d'echec que j'observe le plus souvent dans l'IA en sante n'est ni l'hallucination ni l'imprecision. C'est l'autorite mal placee.

Un systeme est construit pour aider les cliniciens. Avec le temps — a travers des decisions d'experience utilisateur, l'elargissement du perimetre, ou simplement parce que c'est plus pratique — le systeme commence a faire des recommandations que les patients traitent comme des decisions. Le medecin devient un tampon. La chaine de responsabilite se brise sans que personne ne le remarque.

Ce n'est pas hypothetique. C'est un schema qui se repete dans toutes les industries quand l'automatisation est deployee sans une theorie claire de ce que la responsabilite exige.

En aviation, le pilote automatique n'a pas remplace les pilotes. Il a change ce que font les pilotes — deplacant leur role du controle manuel vers la supervision du systeme, la gestion des exceptions et l'autorite finale dans les situations inedites. La position structurelle du commandant n'a pas change. Le cockpit a change autour de cette position.

La medecine a besoin d'une clarte de conception similaire. La question n'est pas quelle part d'autorite l'IA peut absorber. La question est comment l'IA devrait etre positionnee par rapport a l'autorite qui doit rester humaine.

## Ce que cela signifie pour construire l'IA en medecine

Quand j'ai construit le systeme d'accueil pour ma clinique, j'ai garde un principe au centre de chaque decision de conception : **l'IA sert la capacite du medecin a juger ; elle ne s'y substitue pas.**

Concretement, cela signifie que l'IA gere la structuration de l'accueil, la detection des lacunes informationnelles et la communication multilingue. Elle produit un dossier de cas qui rend l'examen du medecin plus rapide et plus complet. Mais le medecin lit d'abord les propres mots du patient — avant de voir un resume. Le medecin valide le cadre decisionnel. Le medecin detient l'autorite qui est transmise a l'hopital.

L'IA n'est pas en aval du medecin dans cette conception. Elle est en amont — preparant les conditions dans lesquelles un bon jugement medical devient possible.

Cette distinction semble simple. Elle est etonnamment difficile a preserver lors de la construction de systemes reels, parce que l'IA est veritablement meilleure que les humains pour certaines taches, et il y a une pression constante pour la laisser en faire davantage. Resister a cette pression necessite un engagement philosophique clair, pas seulement un garde-fou technique.

## La question qui merite d'etre posee

Je veux suggerer un cadre different pour penser l'IA en medecine.

Au lieu de demander « l'IA remplacera-t-elle les medecins ? », demandez : **« Que fait un systeme d'IA bien concu a la qualite du jugement medical ? »**

Si la reponse est « il rend le jugement medical plus rapide, mieux informe et applique a des cas mieux prepares » — c'est un systeme bien concu.

Si la reponse est « il reduit les cas ou le jugement medical est invoque » — c'est un systeme dangereux, independamment de ses benchmarks de precision.

La question la plus importante dans l'IA en sante n'est pas la capacite. C'est l'architecture. Comment les roles sont-ils definis ? Ou s'arrete l'autorite de l'IA et ou commence celle du medecin ? Que se passe-t-il quand l'IA se trompe, et qui en porte les consequences ?

Ce ne sont pas des questions d'ingenierie. Ce sont des questions de gouvernance. Et le domaine est en retard pour les poser.

## Ou je vois cela aller

Je suis optimiste quant a l'IA en medecine — veritablement, pas de maniere performative. Le potentiel de l'IA pour reduire la fragmentation informationnelle, les echecs de communication et les lacunes de continuite qui nuisent aux patients chaque jour est reel et considerable.

Mais ce potentiel ne se realise que si les systemes sont concus avec une clarte structurelle sur ce que font les medecins qui ne peut pas etre automatise. La precision sans responsabilite n'est pas une solution. C'est une nouvelle forme du probleme original.

Les medecins qui prospereront dans la prochaine decennie ne sont pas ceux qui resistent a l'IA. Ce sont ceux qui comprennent, precisement, ce que l'IA peut faire mieux qu'eux — et qui concoivent des systemes qui utilisent cette capacite pour etendre leur jugement plutot que pour le remplacer.

C'est la question autour de laquelle je construis. Je ne pense pas qu'elle ait encore ete resolue. Mais c'est la bonne question.

---

*Le Dr. Jee Hoon Ju est medecin et fondateur d'[AetherHeal](/fr/how-it-works), une plateforme dirigee par des medecins pour les patients internationaux envisageant des soins medicaux en Coree. En savoir plus sur [la gouvernance de l'IA au sein du processus AetherHeal](/fr/trust-protocol), ou decouvrez [pourquoi la Coree est devenue une destination pour les soins medicaux](/fr/blog/why-korea-for-medical-care).*
