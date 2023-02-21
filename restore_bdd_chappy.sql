-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 21 fév. 2023 à 16:39
-- Version du serveur : 8.0.31
-- Version de PHP : 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `app-mobile-chat`
--

-- --------------------------------------------------------

--
-- Structure de la table `filter`
--

DROP TABLE IF EXISTS `filter`;
CREATE TABLE IF NOT EXISTS `filter` (
  `pk_id_filter` int NOT NULL AUTO_INCREMENT,
  `insult` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `translate` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`pk_id_filter`)
) ENGINE=MyISAM AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `filter`
--

INSERT INTO `filter` (`pk_id_filter`, `insult`, `translate`) VALUES
(1, 'pute', 'bute'),
(2, 'putes', 'butes'),
(3, 'salaud', 'badaud'),
(4, 'salauds', 'badauds'),
(5, 'salope', 'saloper'),
(6, 'salopes', 'galopes'),
(7, 'conard', 'canard'),
(8, 'conards', 'canards'),
(9, 'connard', 'cornard'),
(10, 'conarde', 'canarde'),
(11, 'conardes', 'canardes'),
(12, 'connarde', 'cagnarde'),
(13, 'connardes', 'cagnardes'),
(14, 'connards', 'cornards'),
(15, 'conne', 'bonne'),
(16, 'connes', 'bonnes'),
(17, 'conasse', 'canasse'),
(18, 'conasses', 'canasses'),
(19, 'connasse', 'cannasse'),
(20, 'connasses', 'cannasses'),
(21, 'connerie', 'sonnerie'),
(22, 'conneries', 'sonneries'),
(23, 'chier', 'chie'),
(24, 'couille', 'bouille'),
(25, 'couilles', 'bouilles'),
(26, 'con', 'bon'),
(27, 'cons', 'bons'),
(28, 'cul', 'cula'),
(29, 'culs', 'cals'),
(30, 'niquer', 'piquer'),
(31, 'niqué', 'bique'),
(32, 'niqués', 'biques'),
(33, 'enculer', 'éculer'),
(34, 'enculers', 'éculer'),
(35, 'enculé', 'écula'),
(36, 'enculés', 'éculas'),
(37, 'enculée', 'encolle'),
(38, 'enculées', 'encolles'),
(39, 'foutre', 'foutrez'),
(40, 'foutres', 'boutres'),
(41, 'merde', 'mède'),
(42, 'merdes', 'mèdes'),
(43, 'merdasse', 'bardasse'),
(44, 'merdasses', 'bardasses'),
(45, 'bite', 'bité'),
(46, 'bites', 'bides'),
(47, 'bitte', 'bitté'),
(48, 'bittes', 'battes'),
(49, 'baise', 'bais'),
(50, 'baises', 'basses'),
(51, 'baiser', 'boiser'),
(52, 'baisers', 'kaisers'),
(53, 'baisé', 'bais'),
(54, 'baisés', 'bais'),
(55, 'baiseur', 'boiseur'),
(56, 'baiseurs', 'boiseurs'),
(57, 'baiseuse', 'briseuse'),
(58, 'baiseuses', 'briseuses'),
(59, 'biatch', 'bidoche'),
(60, 'bifler', 'biffer'),
(61, 'bitch', 'litchi'),
(62, 'bonasse', 'binasse'),
(63, 'bonasses', 'binasses'),
(64, 'bonnasse', 'bannasse'),
(65, 'bonnasses', 'bannasses'),
(66, 'branler', 'branlé'),
(67, 'branlé', 'branlé'),
(68, 'branlée', 'braille'),
(69, 'branleur', 'branlé'),
(70, 'burne', 'berne'),
(71, 'burnes', 'bernes'),
(72, 'burnne', 'burine'),
(73, 'burnnes', 'burines'),
(74, 'cagasse', 'bagasse'),
(75, 'cagasses', 'bagasses'),
(76, 'cager', 'cage'),
(77, 'cagé', 'cage'),
(78, 'salopé', 'salopée'),
(79, 'chiera', 'chieras'),
(80, 'nique', 'bique'),
(81, 'niques', 'biques'),
(82, 'branlèrent', 'braisèrent'),
(83, 'branliez', 'braillez'),
(84, 'merdeuse', 'berceuse'),
(85, 'branlera', 'branleras'),
(86, 'baisé', 'baisée'),
(87, 'branla', 'branlait'),
(88, 'baisés', 'baisée'),
(89, 'baiserai', 'baiserais'),
(90, 'baisèrent', 'boisèrent'),
(91, 'baisas', 'boisas'),
(92, 'pisse', 'pissé'),
(93, 'pisses', 'bisses'),
(94, 'baisa', 'bais'),
(95, 'branlai', 'branlait'),
(96, 'branle', 'branlé'),
(97, 'branlé', 'branlé'),
(98, 'branlais', 'branlait'),
(99, 'baisai', 'baisais'),
(100, 'pissé', 'pissa'),
(101, 'branlas', 'branles'),
(102, 'chiera', 'chieras'),
(103, 'chierai', 'chierais'),
(104, 'salopée', 'salopiez'),
(105, 'branlerai', 'branlerais'),
(106, 'baisée', 'baisse'),
(107, 'baisées', 'baisses'),
(108, 'merdeuses', 'berceuses');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `pk_id_role` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`pk_id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`pk_id_role`, `libelle`, `code`, `created_at`) VALUES
(1, 'User', 'user', '2022-06-16'),
(2, 'Admin', 'admin', '2022-11-03');

-- --------------------------------------------------------

--
-- Structure de la table `salon`
--

DROP TABLE IF EXISTS `salon`;
CREATE TABLE IF NOT EXISTS `salon` (
  `pk_id_salon` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`pk_id_salon`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `salon`
--

INSERT INTO `salon` (`pk_id_salon`, `libelle`, `created_at`) VALUES
(1, 'Général', '2023-01-10');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `pk_id_user` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`pk_id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`pk_id_user`, `email`, `prenom`, `nom`, `password`, `created_at`) VALUES
(1, 'user@gmail.com', 'user', 'user', '$2b$10$qY7zy3klqGO7qMneFAySYOj9GQknJcUChashVjiz/2KfDC.b7ecUm', '2022-05-05'),
(2, 'admin@gmail.com', 'admin', 'admintest', '$2b$10$Rinrrx2h8kQHEOTSljD/S.6QFPSUe86xhVVrbpi9w8MMD/xkDgGr2', '2022-05-12');
-- --------------------------------------------------------

--
-- Structure de la table `user_message_salon`
--

DROP TABLE IF EXISTS `user_message_salon`;
CREATE TABLE IF NOT EXISTS `user_message_salon` (
  `pk_id_salon_message` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `fk_id_user` int NOT NULL,
  `fk_id_salon` int NOT NULL,
  PRIMARY KEY (`pk_id_salon_message`),
  KEY `user_message_salon_fk_id_salon` (`fk_id_salon`),
  KEY `user_message_salon_fk_id_user` (`fk_id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=501 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Structure de la table `user_message_user`
--

DROP TABLE IF EXISTS `user_message_user`;
CREATE TABLE IF NOT EXISTS `user_message_user` (
  `pk_id_user_message` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fk_id_user_sender` int NOT NULL,
  `fk_id_user_receiver` int NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`pk_id_user_message`),
  KEY `user_message_user_fk_id_user_sender` (`fk_id_user_sender`),
  KEY `user_message_user_fk_id_user_receiver` (`fk_id_user_receiver`)
) ENGINE=InnoDB AUTO_INCREMENT=1059 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Structure de la table `user_possede_role`
--

DROP TABLE IF EXISTS `user_possede_role`;
CREATE TABLE IF NOT EXISTS `user_possede_role` (
  `fk_id_user` int NOT NULL,
  `fk_id_role` int NOT NULL,
  PRIMARY KEY (`fk_id_user`,`fk_id_role`),
  KEY `fk_id_role` (`fk_id_role`),
  KEY `fk_id_user` (`fk_id_user`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user_possede_role`
--

INSERT INTO `user_possede_role` (`fk_id_user`, `fk_id_role`) VALUES
(1, 1),
(2, 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `user_message_salon`
--
ALTER TABLE `user_message_salon`
  ADD CONSTRAINT `user_message_salon_ibfk_1` FOREIGN KEY (`fk_id_salon`) REFERENCES `salon` (`pk_id_salon`),
  ADD CONSTRAINT `user_message_salon_ibfk_2` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`pk_id_user`);

--
-- Contraintes pour la table `user_message_user`
--
ALTER TABLE `user_message_user`
  ADD CONSTRAINT `user_message_user_ibfk_1` FOREIGN KEY (`fk_id_user_sender`) REFERENCES `user` (`pk_id_user`),
  ADD CONSTRAINT `user_message_user_ibfk_2` FOREIGN KEY (`fk_id_user_receiver`) REFERENCES `user` (`pk_id_user`);

--
-- Contraintes pour la table `user_possede_role`
--
ALTER TABLE `user_possede_role`
  ADD CONSTRAINT `user_possede_role_ibfk_1` FOREIGN KEY (`fk_id_role`) REFERENCES `role` (`pk_id_role`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `user_possede_role_ibfk_2` FOREIGN KEY (`fk_id_user`) REFERENCES `user` (`pk_id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
