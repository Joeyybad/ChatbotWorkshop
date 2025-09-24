'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1️⃣ Insérer les familles
    await queryInterface.bulkInsert('liste_famille', [
      { id: 1, famille: 'Hydratation' },
      { id: 2, famille: 'Alimentation' },
      { id: 3, famille: 'Hygiène & Santé' },
      { id: 4, famille: 'Énergie & Lumière' },
      { id: 5, famille: 'Sécurité & Défense' },
      { id: 6, famille: 'Organisation & Vie collective' },
      { id: 7, famille: 'Environnement & Nature' }
    ]);

    // 2️⃣ Insérer les articles
    await queryInterface.bulkInsert('chatbot_data', [
      { id: 1, titre: 'Où récupérer de l’eau ?', texte: 'À la sortie nord du campement Horizon, suivez le chemin balisé jusqu’à l’ancien réservoir municipal. Des cuves sécurisées y sont installées et remplies régulièrement. Apportez vos propres contenants et ne prenez que ce dont vous avez besoin.' },
      { id: 2, titre: 'Comment rendre l’eau potable ?', texte: 'Pour purifier l’eau : <br> <br>\r\n\r\n1.Faites-la bouillir pendant au moins 10 minutes.<br>\r\n2.Si vous n’avez pas de feu, utilisez des pastilles de purification (stock limité, disponibles au poste médical).<br>\r\n3.Filtrez l’eau à travers un tissu propre pour enlever les impuretés avant tout traitement.' },
      { id: 3, titre: 'Où trouver de la nourriture ?', texte: 'Des rations sont distribuées chaque matin à la cantine centrale, près du bâtiment administratif. Pour compléter, des potagers communautaires sont cultivés derrière l’ancienne école. Chacun peut y contribuer et récolter selon les règles établies.' },
      { id: 4, titre: 'Comment conserver les aliments ?', texte: 'Enterrez les denrées périssables dans des sacs hermétiques à environ 1 mètre de profondeur, dans un sol frais et sec. Le sel peut aussi être utilisé pour conserver la viande. Ne stockez jamais de nourriture dans vos tentes : cela attire les animaux.' },
      { id: 5, titre: 'Comment se protéger la nuit ?', texte: 'Restez dans le périmètre éclairé du camp. Des patrouilles veillent, mais chaque tente doit maintenir une lampe à faible intensité prête à l’usage. Ne vous déplacez pas seul après le couvre-feu (21h).' },
      { id: 6, titre: 'Que faire en cas de blessure légère ?', texte: 'Nettoyez la plaie immédiatement avec de l’eau propre, puis appliquez une compresse ou un tissu stérile. Changez le pansement deux fois par jour. Si la blessure gonfle, devient rouge ou douloureuse, rendez-vous au poste médical sans attendre.' },
      { id: 7, titre: 'Où trouver des médicaments ?', texte: 'Le stock de médicaments est limité et centralisé au poste médical, près de la tour de garde sud. Seul le personnel de santé est autorisé à les distribuer, selon les priorités médicales.' },
      { id: 8, titre: 'Comment signaler un danger ?', texte: 'Chaque quartier du camp est équipé d’une cloche métallique. En cas de danger immédiat (incendie, intrusion, attaque), frappez trois fois de suite. Pour un problème non urgent, signalez-le au poste de garde le plus proche.' },
      { id: 9, titre: 'Comment participer à la défense du camp ?', texte: 'Inscrivez-vous auprès du chef de garde. Des rotations de surveillance sont organisées chaque nuit. Même les novices peuvent être formés à la vigie ou à l’alerte. Chaque contribution compte.' },
      { id: 10, titre: 'Comment rester informé ?', texte: 'Chaque soir à 19h, une réunion publique est organisée sur la place centrale. Les annonces importantes, les nouvelles missions et les alertes y sont communiquées. Assurez-vous d’y assister ou de déléguer quelqu’un de votre groupe.' },
      { id: 11, titre: 'Comment allumer un feu sans briquet ?', texte: 'Utilisez deux pierres pour produire des étincelles sur un morceau de tissu sec ou d’amadou (écorce, herbes sèches). Vous pouvez aussi frotter un bâton sec dans une rainure de bois tendre, mais cela demande du temps et de l’énergie. Protégez toujours le feu du vent.' },
      { id: 12, titre: 'Où récupérer du bois de chauffage ?', texte: 'Privilégiez les branches mortes tombées au sol, elles brûlent mieux et évitent d’endommager les arbres encore vivants. N’abattez pas d’arbres dans le périmètre du camp sans autorisation. Des zones de coupe sont indiquées à l’est.' },
      { id: 13, titre: 'Comment éviter les maladies ?', texte: 'Privilégiez les branches mortes tombées au sol, elles brûlent mieux et évitent d’endommager les arbres encore vivants. N’abattez pas d’arbres dans le périmètre du camp sans autorisation. Des zones de coupe sont indiquées à l’est.' },
      { id: 14, titre: 'Où se laver ?', texte: 'Un espace d’hygiène a été aménagé près de la rivière, à 300 mètres au sud du camp. Utilisez du savon biodégradable. Ne lavez jamais vêtements ni ustensiles directement dans la rivière, mais dans les bassins prévus.' },
      { id: 15, titre: 'Comment gérer les déchets ?', texte: 'Triez vos déchets : <br> <br>- Les organiques (nourriture) → compost ou enfouissement.<br>- Le métal et le plastique → dépôt à la zone de recyclage à l’ouest.<br>- Les dangereux (piles, produits chimiques) → remettre directement au poste technique.' },
      { id: 16, titre: 'Où dormir en sécurité ?', texte: 'Installez votre tente à l’intérieur du périmètre balisé. Évitez les zones proches des clôtures. Les familles avec enfants doivent être regroupées au centre pour plus de sécurité.' },
      { id: 17, titre: 'Comment économiser l’énergie ?', texte: 'Utilisez les lampes solaires collectives en priorité. Les générateurs ne fonctionnent que quelques heures par jour. Éteignez systématiquement toute source lumineuse non nécessaire après 22h.' },
      { id: 18, titre: 'Où trouver de la lumière ?', texte: 'Des lampes solaires sont disponibles au point de distribution énergétique, près de l’ancien centre culturel. Chaque foyer ne peut recevoir qu’une lampe par tente. Rechargez-les chaque matin au soleil.' },
      { id: 19, titre: 'Comment fabriquer une lampe de fortune ?', texte: 'Remplissez un petit récipient avec de l’huile végétale, plongez-y un tissu roulé en mèche. Allumez la mèche : la flamme produira une lumière suffisante pour une pièce fermée. Toujours surveiller la lampe en fonctionnement.' },
      { id: 20, titre: 'Comment protéger ses réserves de nourriture ?', texte: 'Gardez vos réserves dans des contenants hermétiques (seaux, bidons). Suspendez-les à 2 mètres du sol si possible, pour éviter rongeurs et animaux. Signalez tout vol ou disparition.' },
      { id: 21, titre: 'Où se soigner en cas de blessure grave ?', texte: 'Le poste médical est situé dans l’ancien bâtiment administratif, salle 3. Les soins urgents y sont assurés jour et nuit. Pour les fractures, les infections graves ou les intoxications, rendez-vous immédiatement là-bas.' },
      { id: 22, titre: 'Comment reconnaître une intoxication alimentaire ?', texte: 'Symptômes : douleurs abdominales, diarrhée, vomissements, fièvre. Si vous ressentez ces signes après un repas, signalez-le immédiatement au poste médical et indiquez ce que vous avez consommé.' },
      { id: 23, titre: 'Comment éviter les incendies ?', texte: 'Ne laissez jamais un feu sans surveillance. Tenez toujours un seau d’eau ou de sable à proximité. N’utilisez pas de lampes à huile dans les tentes. Les zones de cuisson sont limitées à l’espace prévu à cet effet.' },
      { id: 24, titre: 'Que faire en cas d’incendie ?', texte: 'Criez “Feu ! Feu ! Feu !” pour alerter le camp. Utilisez eau, sable ou couvertures épaisses pour étouffer les flammes. Évacuez les personnes vers la place centrale. Ne retournez jamais chercher des objets personnels.' },
      { id: 25, titre: 'Comment participer aux cultures ?', texte: 'Les potagers collectifs sont organisés derrière l’ancienne école. Inscrivez-vous au tableau de service pour participer à l’arrosage, aux récoltes et à l’entretien. Les récoltes sont partagées entre tous les contributeurs.' },
      { id: 26, titre: 'Comment se signaler en cas de perte dans la nature ?', texte: 'Restez sur place et faites du bruit toutes les 5 minutes. Allumez un feu ou utilisez un miroir pour refléter la lumière du soleil. Si vous avez un sifflet, soufflez trois coups répétés : c’est le signal de détresse.' },
      { id: 27, titre: 'Que faire en cas d’attaque extérieure ?', texte: 'Rejoignez immédiatement l’abri le plus proche. Ne cherchez pas à affronter seul. Les gardes sont formés et équipés. Restez au sol si des tirs retentissent. Attendez le signal de fin de danger avant de sortir' },
      { id: 28, titre: 'Comment se protéger du froid ?', texte: 'Superposez plusieurs couches de vêtements. Gardez la tête et les pieds couverts. Utilisez des couvertures de survie si disponibles. Dormez à plusieurs dans la même tente pour partager la chaleur corporelle.' },
      { id: 29, titre: 'Comment prévenir les coups de chaleur ?', texte: 'Hydratez-vous régulièrement, même sans soif. Portez un couvre-chef. Reposez-vous à l’ombre aux heures les plus chaudes (12h–16h). En cas de vertige ou de nausée, allongez la personne à l’ombre et rafraîchissez son corps avec de l’eau.' },
      { id: 30, titre: 'Comment maintenir la cohésion du camp ?', texte: 'Respectez les règles établies collectivement. Participez aux assemblées du soir. Écoutez et soutenez vos voisins. Chaque voix compte, chaque effort renforce notre survie commune.' }
    ]);

    // 3️⃣ Lier les articles aux familles
    await queryInterface.bulkInsert('famille_article', [
      { id_article: 1, id_famille: 1 },
      { id_article: 1, id_famille: 2 },
      { id_article: 2, id_famille: 1 },
      { id_article: 2, id_famille: 3 },
      { id_article: 3, id_famille: 2 },
      { id_article: 4, id_famille: 2 },
      { id_article: 5, id_famille: 5 },
      { id_article: 6, id_famille: 3 },
      { id_article: 7, id_famille: 3 },
      { id_article: 7, id_famille: 6 },
      { id_article: 8, id_famille: 5 },
      { id_article: 8, id_famille: 6 },
      { id_article: 9, id_famille: 5 },
      { id_article: 9, id_famille: 6 },
      { id_article: 10, id_famille: 6 },
      { id_article: 11, id_famille: 4 },
      { id_article: 11, id_famille: 7 },
      { id_article: 12, id_famille: 4 },
      { id_article: 12, id_famille: 7 },
      { id_article: 13, id_famille: 3 },
      { id_article: 14, id_famille: 3 },
      { id_article: 15, id_famille: 3 },
      { id_article: 15, id_famille: 6 },
      { id_article: 16, id_famille: 5 },
      { id_article: 16, id_famille: 6 },
      { id_article: 17, id_famille: 4 },
      { id_article: 17, id_famille: 6 },
      { id_article: 18, id_famille: 4 },
      { id_article: 19, id_famille: 4 },
      { id_article: 19, id_famille: 7 },
      { id_article: 20, id_famille: 2 },
      { id_article: 20, id_famille: 5 },
      { id_article: 21, id_famille: 3 },
      { id_article: 22, id_famille: 2 },
      { id_article: 22, id_famille: 3 },
      { id_article: 23, id_famille: 5 },
      { id_article: 23, id_famille: 6 },
      { id_article: 24, id_famille: 5 },
      { id_article: 24, id_famille: 6 },
      { id_article: 25, id_famille: 2 },
      { id_article: 25, id_famille: 6 },
      { id_article: 26, id_famille: 5 },
      { id_article: 26, id_famille: 7 },
      { id_article: 27, id_famille: 5 },
      { id_article: 28, id_famille: 3 },
      { id_article: 28, id_famille: 4 },
      { id_article: 29, id_famille: 3 },
      { id_article: 30, id_famille: 6 }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('famille_article', null, {});
    await queryInterface.bulkDelete('chatbot_data', null, {});
    await queryInterface.bulkDelete('liste_famille', null, {});
  }
};
