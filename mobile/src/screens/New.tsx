import { Heading, VStack, Text } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import Logo from '../assets/logo.svg';

export function New() {
  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Criar novo bolão' />

      <VStack mt={8} mx={5} alignItems='Center'>
        <Logo />

        <Heading my={8} fontFamily='heading' fontSize='xl' color='white' textAlign='center'>
          Crie seu próprio bolão da copa {'\n'}
          e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder='Qual o nome do seu bolão?'
        />

        <Button
          title="Criar meu bolão"
        />

        <Text mt={4} px={10} color='gray.200' fontSize='sm' textAlign='center'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
