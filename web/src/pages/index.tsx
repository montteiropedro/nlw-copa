import Image from 'next/image';

import logoImg from '../assets/logo.svg';
import mobilePreviewImg from '../assets/mobile-app-preview.png';
import usersAvatarsExampleImg from '../assets/users-avatars-example.png';
import checkImg from '../assets/icon-check.svg';

import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCount: number
  guessCount: number,
  userCount: number
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState<string>('');
  
  async function handleCreatePool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert('Bolão criado com sucesso! Código copiado para área de transferência');
      setPoolTitle('');
    }
    catch(err) {
      console.log(err);
      alert('Falha ao criar o bolão!')
    }
  }
  
  return (
    <div className="my-16 mx-auto h-screen max-w-[1124px] grid grid-cols-2 items-center gap-28">
      <main className="my-auto">
        <Image
          src={logoImg}
          alt="Logo da NLW Copa"
          quality={100}
        />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src={usersAvatarsExampleImg}
            alt="Avatares de usuários que já estão utilizando a aplicação"
            quality={100}
          />

          <strong className="text-nlw-gray-100 text-xl">
            <span className="text-nlw-green-500">+{userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={handleCreatePool} className="mt-10 flex gap-2 text-nlw-gray-100">
          <input
            required
            type="text"
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)}
            className="px-6 py-4 flex-1 bg-nlw-gray-800 border border-nlw-gray-600 text-sm rounded"
          />
          
          <button
            type="submit"
            className="px-6 py-4 bg-nlw-yellow-500 hover:bg-nlw-yellow-700 text-sm text-nlw-gray-900 font-bold uppercase rounded transition ease-in-out duration-300"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-nlw-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
      
        <div className="mt-10 pt-10 flex justify-between border-t text-nlw-gray-100 border-nlw-gray-600 divide-x divide-nlw-gray-600">
          <div className="w-[50%] flex justify-start">
            <Image
              src={checkImg}
              alt=""
              quality={100}
              className="mr-6"
            />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-[50%] flex justify-end">
            <Image
              src={checkImg}
              alt=""
              quality={100}
              className="mr-6"
            />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={mobilePreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel"
        quality={100}
      />
    </div>
  );
}

// TODO: Study about getStaticProps

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count'),
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    }
  }
}
