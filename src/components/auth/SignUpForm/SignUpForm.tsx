import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { notificationController } from '@app/controllers/notificationController';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './SignUpForm.styles';
import { useStore } from '@app/temp/utils/store';
import { sleep } from '@app/temp/utils/etc';
import { UserBaseType } from '@app/temp/utils/types'

interface SignUpFormData {
    email: string;
    password: string;
}

const initValues = {
    email: null,
    password: null,
    confirmPassword: null,
    termOfUse: true,
};

export const SignUpForm: React.FC = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const { authStore, userStore } = useStore();

    authStore.logout()

    const handleSubmit = async (values: SignUpFormData) => {
        const userBase: UserBaseType = {
            email: values.email,
            password: values.password
        }
        setLoading(true);
        const isSuccessful = await userStore.createUser(userBase)
        await sleep(500) // artificial delay
        if (isSuccessful) {
            notificationController.success({ message: "Account created" });
            navigate('/login');
        } else {
            notificationController.error({ message: "Failed creating account" });
            setLoading(false);
        }
    };

    return (
        <Auth.FormWrapper>
        <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}>
            <S.Title>{t('common.signUp')}</S.Title>
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
            <Auth.FormItem
                label={t('common.confirmPassword')}
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    { required: true, message: t('common.requiredField') },
                    ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                        }
                        return Promise.reject(new Error(t('common.confirmPasswordError')));
                    },
                    }),
                ]}
                >
                <Auth.FormInputPassword placeholder={t('common.confirmPassword')} />
            </Auth.FormItem>
            <Auth.ActionsWrapper>
                <BaseForm.Item name="termOfUse" valuePropName="checked" noStyle>
                    <Auth.FormCheckbox>
                        &nbsp;
                        <Auth.Text>
                            {t('signup.agree')}{' '}
                            <Link to="/pages/404" target={'_blank'}>
                            <Auth.LinkText>{t('signup.termOfUse')}</Auth.LinkText>
                            </Link>{' '}
                            and{' '}
                            <Link to="/pages/404" target={'_blank'}>
                            <Auth.LinkText>{t('signup.privacyOPolicy')}</Auth.LinkText>
                            </Link>
                        </Auth.Text>
                    </Auth.FormCheckbox>
                </BaseForm.Item>
            </Auth.ActionsWrapper>
            <BaseForm.Item noStyle>
                <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
                    {t('common.signUp')}
                </Auth.SubmitButton>
            </BaseForm.Item>
            <Auth.FooterWrapper>
                <Auth.Text>
                    {t('signup.alreadyHaveAccount')}{' '}
                    <Link to="/login">
                        <Auth.LinkText>{t('common.here')}</Auth.LinkText>
                    </Link>
                </Auth.Text>
            </Auth.FooterWrapper>
        </BaseForm>
        </Auth.FormWrapper>
    );
};
