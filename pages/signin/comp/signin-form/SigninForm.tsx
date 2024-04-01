import { NextRouter } from 'next/router';
import styled from 'styled-components';

import FormSubmitButton from '@components/ui/atoms/button/form-submit-btn/FormSubmitButton';
import InputWithLabel from '@components/ui/atoms/input/input-with-label';
import SignForm from '@components/ui/molecules/form/sign-form';

import { useFormOnSubmit } from '@hooks/useFormOnSubmit';
import { setToken } from '@utils/local-storage/setToken';

import { useSignin } from './hooks/useSignin.mutation';

import { SIGN, SIGNIN_REGISTER_OPTIONS, SUBMIT_ERROR_MSG_LIST } from '@/constant/sign/sign';
import { SigninInputs } from '@/interface/sign/sign';

type SigninFormProps = {
  router: NextRouter;
};

const SigninForm = ({ router }: SigninFormProps) => {
  const { mutateAsync } = useSignin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useFormOnSubmit<SigninInputs>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      try {
        const { accessToken, refreshToken } = await mutateAsync({ email, password });
        setToken({ accessToken, refreshToken });
        reset();
        router.push('/folder');
      } catch (error) {
        console.log(error);
        SUBMIT_ERROR_MSG_LIST.forEach(({ name, message }) => {
          setError(name, {
            message,
          });
        });
      }
    },
  });

  return (
    <SignForm.FormContainer>
      <SignForm.Form noValidate method='post' onSubmit={handleSubmit}>
        <SignForm.InputGap>
          <InputWithLabel
            id={SIGN.EMAIL}
            type='email'
            isError={!!errors[SIGN.EMAIL]}
            placeholder='이메일을 입력해주세요.'
            autoComplete='email'
            label='이메일'
            {...register(SIGN.EMAIL, SIGNIN_REGISTER_OPTIONS.email)}
          >
            <StErrorMsg>{errors[SIGN.EMAIL]?.message}</StErrorMsg>
          </InputWithLabel>

          <InputWithLabel
            id={SIGN.PASSWORD}
            type='password'
            isError={!!errors[SIGN.PASSWORD]}
            placeholder='비밀번호를 입력해 주세요.'
            srcOnPasswordType='/images/icon/eye-off.svg'
            srcOnTextType='/images/icon/eye-on.svg'
            autoComplete='current-password'
            label='비밀번호'
            {...register(SIGN.PASSWORD, SIGNIN_REGISTER_OPTIONS.password)}
          >
            <StErrorMsg>{errors[SIGN.PASSWORD]?.message}</StErrorMsg>
          </InputWithLabel>
        </SignForm.InputGap>

        <FormSubmitButton disabled={isSubmitting} type='submit'>
          로그인
        </FormSubmitButton>
      </SignForm.Form>

      <SignForm.SocialMediaLogin />
    </SignForm.FormContainer>
  );
};

export default SigninForm;

export const StErrorMsg = styled.p`
  color: var(--Linkbrary-red, #ff5b56);

  font-size: 1.4rem;
  font-weight: 400;
  line-height: normal;

  margin: 0;
`;
