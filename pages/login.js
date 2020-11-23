import React,{useState} from 'react';
import Router from 'next/router';
import Layout from '../components/layouts/Layout';
import { Formulario,Campo,InputSubmit,Error} from '../components/ui/Formulario';
import {css} from '@emotion/core';

import firebase from '../firebase';

//validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

export default function Login() {

  const [error,guardarError] = useState(false);

  const STATE_INICIAL ={
    email:'',
    password:''
  }

  const { valores,errores,submitForm,handleSubmit,handleChange,handleBlur } = useValidacion(STATE_INICIAL,validarIniciarSesion, iniciarSesion);

  const {email,password} = valores;
  
  async function iniciarSesion () {
    
    try {

      await firebase.login(email,password);
      Router.push('/');
      
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message);
      guardarError(error);
    }


  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align:center;
            `}
          >Iniciar Sesion</h1>
          <Formulario onSubmit={handleSubmit}>
            
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.email && <Error>{errores.email}</Error>}

            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.password && <Error>{errores.password}</Error>}

            {error && <Error>{error.message}</Error>}

            <InputSubmit
              type="submit"
              value="Iniciar Sesion"
            />
          </Formulario>
        </>
      </Layout>
     
    </div>
  )
}