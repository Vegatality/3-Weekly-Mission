import styled from 'styled-components';

const StModalActionBtn = styled.button.attrs<{ $gradientColor?: string; $originalColor?: string }>(
  ({ type, ...rest }) => ({
    type: type || 'submit',
    ...rest,
  }),
)`
  width: 100%;
  height: 5.1rem;

  color: var(--Grey-Light, #f5f5f5);
  font-size: 1.6rem;
  font-weight: 600;
  line-height: normal;

  border-radius: 0.8rem;
  border-width: 0;

  background-image: ${({ theme, $gradientColor = 'purpleblue-to-skyblue', $originalColor }) =>
    !$originalColor &&
    theme[$gradientColor]}; // ✅'red' -> false, undefined, null, ''은 아예 그 css 속성을 없애나 봐요.

  background-color: ${({ theme, $originalColor }) => $originalColor && theme[$originalColor]};
`;

export { StModalActionBtn };
