import ATypography, { Props as ATypographyProps } from './Typography';
import Text from './Text';


export type TypographyProps = typeof ATypography & {
    Text: typeof Text;
    // Link: typeof Link;
};

const Typography = ATypography as TypographyProps;
Typography.Text = Text;
// Typography.Title = Title;

export default Typography;
  