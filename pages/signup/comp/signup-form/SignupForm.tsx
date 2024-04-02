import { NextRouter } from 'next/router';

import FormSubmitButton from '@components/ui/atoms/button/form-submit-btn/FormSubmitButton';
import InputWithLabel from '@components/ui/atoms/input/input-with-label';
import SignForm from '@components/ui/molecules/form/sign-form';
import { StErrorMsg } from '@pages/signin/comp/signin-form/SigninForm';

import { checkEmailDuplication } from '@apis/auth/checkEmailDuplication';
import { useFormOnSubmit } from '@hooks/useFormOnSubmit';
import { setToken } from '@utils/local-storage/setToken';

import { useSignup } from './hooks/useSignup.mutation';

import { EMAIL_REGEX } from '@/constant/regex';
import { SIGN, SIGNUP_REGISTER_OPTIONS } from '@/constant/sign/sign';
import { SignupInputs } from '@/interface/sign/sign';

type SignupFormProps = {
  router: NextRouter;
};

const SignupForm = ({ router }: SignupFormProps) => {
  const { mutateAsync } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    getValues,
  } = useFormOnSubmit<SignupInputs>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ email, password }) => {
      try {
        const { accessToken, refreshToken } = await mutateAsync({ email, password });
        setToken({ accessToken, refreshToken });
        reset();
        router.push('/folder');
      } catch (error) {
        if (error instanceof Error) {
          if (Number(error.message) === 400) {
            setError(SIGN.EMAIL, {
              message: '이메일을 확인해주세요.',
            });
          } else if (Number(error.message) === 422) {
            setError(SIGN.PASSWORD, {
              message: '비밀번호를 확인해주세요.',
            });
          }
        }
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
            {...register(SIGN.EMAIL, {
              ...SIGNUP_REGISTER_OPTIONS.email,
              onBlur: async () => {
                if (!EMAIL_REGEX.test(getValues().email)) return;

                try {
                  const { isUsableEmail } = await checkEmailDuplication(getValues()[SIGN.EMAIL]);

                  if (!isUsableEmail) {
                    throw new Error('409');
                  }
                } catch (error) {
                  if (error instanceof Error) {
                    if (Number(error.message) === 409) {
                      setError(SIGN.EMAIL, {
                        message: '이미 존재하는 이메일입니다.',
                      });
                    }
                  }
                }
              },
            })}
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
            {...register(SIGN.PASSWORD, SIGNUP_REGISTER_OPTIONS.password)}
          >
            <StErrorMsg>{errors[SIGN.PASSWORD]?.message}</StErrorMsg>
          </InputWithLabel>

          <InputWithLabel
            id={SIGN.CONFIRM_PASSWORD}
            type='password'
            isError={!!errors[SIGN.CONFIRM_PASSWORD]}
            placeholder='비밀번호와 일치하는 값을 입력해 주세요.'
            srcOnPasswordType='/images/icon/eye-off.svg'
            srcOnTextType='/images/icon/eye-on.svg'
            autoComplete='current-password'
            label='비밀번호 확인'
            {...register(SIGN.CONFIRM_PASSWORD, {
              ...SIGNUP_REGISTER_OPTIONS.confirmPassword,
              validate: (value) => value === getValues()[SIGN.PASSWORD] || '비밀번호가 일치하지 않습니다.',
            })}
          >
            <StErrorMsg>{errors[SIGN.CONFIRM_PASSWORD]?.message}</StErrorMsg>
          </InputWithLabel>
        </SignForm.InputGap>

        <FormSubmitButton disabled={isSubmitting} type='submit'>
          회원가입
        </FormSubmitButton>
      </SignForm.Form>

      <SignForm.SocialMediaLogin />
    </SignForm.FormContainer>
  );
};

export default SignupForm;
