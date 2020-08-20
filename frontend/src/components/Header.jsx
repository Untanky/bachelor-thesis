import React from 'react';

import pjson from '../../package.json';

import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1>Web&shy;schnitt&shy;stellen - Ver&shy;gleich von ver&shy;schie&shy;denen Pro&shy;gram&shy;mier&shy;spra&shy;chen und Frame&shy;works zur Er&shy;stel&shy;lung von REST-Schnitts&shy;tellen</h1>
      <div className="additional-info">
        <b>Bachelorarbeit von <a href="https://lukasgrimm.me">Lukas Grimm</a></b>
        <i>an der <a href="https://www.htw-berlin.de">Hochschule für Technik und Wirtschaft Berlin</a></i>
        <span>Version: {pjson.version}</span>
      </div>
    </header>
  )
};

export default Header;
