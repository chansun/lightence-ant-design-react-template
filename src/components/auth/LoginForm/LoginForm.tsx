import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { notificationController } from '@app/controllers/notificationController';
import * as S from './LoginForm.styles';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import { useStore } from '@app/temp/utils/store';
//import { sleep } from '@app/temp/utils/etc';

interface LoginFormData {
    email: string;
    password: string;
    rememberMe: true,
}

export const initValues: LoginFormData = {
    email: "",
    password: "",
    rememberMe: true,
};

export const LoginForm: React.FC = () => {

    let localEmail: any = window.localStorage.getItem('email')

    const newInitValues: LoginFormData = {
        email: localEmail,
        password: "",
        rememberMe: true,
    };

    if (typeof localEmail !== typeof "string") {
        localEmail = ""
    }

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const { authStore } = useStore();

    authStore.logout()

    const handleSubmit = async (values: LoginFormData) => {
        window.localStorage.removeItem('email');
        if (values.rememberMe) {
            window.localStorage.setItem('email', values.email);
        }
        setLoading(true);
        const isSuccessful = await authStore.login(values.email, values.password);
        //await sleep(500) // artificial delay
        if (isSuccessful) {
            notificationController.success({ message: "Login succeeded" });
            navigate('/');
        } else {
            notificationController.error({ message: "Login failed" });
            setLoading(false);
        }
    };

    return (
        <Auth.FormWrapper>
        <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={newInitValues}>
            <Auth.FormTitle>{t('common.login')}</Auth.FormTitle>
            <S.LoginDescription>{t('login.loginInfo')}</S.LoginDescription>
            <Auth.FormItem
            name="email"
            label={t('common.email')}
            rules={[
                { required: true, message: t('common.requiredField') },
                {
                type: 'email',
                message: t('common.notValidEmail'),
                },
            ]}
            >
            <Auth.FormInput placeholder={t('common.email')} />
                </Auth.FormItem>
                <Auth.FormItem
                    label={t('common.password')}
                    name="password"
                    rules={[{ required: true, message: t('common.requiredField') }]}
                    >
                <Auth.FormInputPassword placeholder={t('common.password')} />
            </Auth.FormItem>
            <Auth.ActionsWrapper>
                <BaseForm.Item name="rememberMe" valuePropName="checked" noStyle>
                    <Auth.FormCheckbox>
                    <S.RememberMeText>{t('login.rememberMe')}</S.RememberMeText>
                    </Auth.FormCheckbox>
                </BaseForm.Item>
                <Link to="/pages/404">
                    <S.ForgotPasswordText>{t('common.forgotPass')}</S.ForgotPasswordText>
                </Link>
            </Auth.ActionsWrapper>
            <BaseForm.Item noStyle>
            <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
                {t('common.login')}
            </Auth.SubmitButton>
            </BaseForm.Item>
            <Auth.FooterWrapper>
            <Auth.Text>
                {t('login.noAccount')}{' '}
                <Link to="/signup">
                <Auth.LinkText>{t('common.here')}</Auth.LinkText>
                </Link>
            </Auth.Text>
            </Auth.FooterWrapper>
        </BaseForm>
        </Auth.FormWrapper>
    );
};
