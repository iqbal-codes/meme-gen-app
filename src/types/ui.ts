import Icon from "@react-native-vector-icons/lucide";

// UI-related types
export type ButtonVariant = 
  | 'primary'
  | 'secondary' 
  | 'outline'
  | 'ghost'
  | 'danger';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type AllIconProps = React.ComponentProps<typeof Icon>['name'];