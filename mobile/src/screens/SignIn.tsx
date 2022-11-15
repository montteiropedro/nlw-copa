import { Center, Text, Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons'

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';

import Logo from '../assets/logo.svg';

export function SignIn() {
  const { signIn, user } = useAuth();

  return (
    <Center p={7} flex={1} bgColor='gray.900'>
      <Logo width={212} height={40} />

      <Button
        mt={12}
        title='Entrar com o Google'
        leftIcon={<Icon as={FontAwesome} name='google' color='white' size='md' />}
        type='SECONDARY'
        onPress={signIn}
      />

      <Text m={4} fontSize='sm' fontFamily='body' textAlign='center' color='gray.200'>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  );
}
