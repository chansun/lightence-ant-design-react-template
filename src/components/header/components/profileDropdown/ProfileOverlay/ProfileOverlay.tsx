import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as S from './ProfileOverlay.styles';

export const ProfileOverlay: React.FC<{onClick: () => void }> = ({onClick}) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <S.Text>
        <Link to="/profile" onClick={onClick}>{t('profile.title')}</Link>
      </S.Text>
      <S.ItemsDivider />
      <S.Text>
        <Link to="/login">{t('header.logout')}</Link>
      </S.Text>
    </div>
  );
};
