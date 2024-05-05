import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WithChildrenProps } from '@app/types/generalTypes';
import { useStore } from '@app/temp/utils/store';
//import { sleep } from '@app/temp/utils/etc';

const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {

  const navigate = useNavigate();
  
  const { authStore } = useStore();

  useEffect(() => {
    const getAccount = async () => {
      //await sleep(1000)
      const isSuccessful = await authStore.getAccount()
      if (!isSuccessful) {
        navigate('/login');
      }
    }
    getAccount()
  })

  return <>{children}</>

};

export default RequireAuth;
