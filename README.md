# teste-tecnico PokedeX

Projeto Desenvolvido para teste técnico.

### Instruções.

Caso não tenha em sua maquina, baixe Docker Desktop:
   https://www.docker.com/products/docker-desktop/

Clone o repositório do projeto:
  ``` 
     git clone https://github.com/AndreLHPsilva/mars-rover.git
  ```
  ``` 
     cd mars-rover
  ```
Caso tenha o VSCODE em sua maquina:
   ``` 
     code .
   ```
Execute os seguintes comandos para configurar o backend.
-  Backend:
   Entre na pasta do backend.
      ```
      cd backend
      ```
Execute os seguintes comandos para configurar o frontend.
-  Frontend:
  Abra uma nova janela do terminal ou vá para o diretório raiz do projeto se você saiu da pasta "backend".

    Entre na pasta do frontend:
      ```
       cd ../frontend
      ```
-  Volte para raiz do projeto:
    ```
     cd ..
    ```
- E depois:
    ```
     docker-compose up --build -d
    ```
- Aguarde alguns instantes e acesse a URL:
    http://localhost:3000/

OBS: Caso ocorra algum erro **Erro inesperado**, aguarde mais um pouco até o container estiver pronto. Após o container docker ser iniciado, atualize a página para utilizar o sistema.


### Versão do NODE   
    v20.8.1
### Versão do NPM   
    v10.1.0
    
### Depêndencias do Frontend
    Desenvolvimento: 
      "@types/node": "^20",
      "@types/react": "^18",
      "@types/react-dom": "^18",
      "postcss": "^8",
      "tailwindcss": "^3.4.1",
      "typescript": "^5"
    Produção
      "@headlessui/react": "^1.7.19",
      "@hookform/resolvers": "^3.3.4",
      "axios": "^1.6.8",
      "lucide-react": "^0.376.0",
      "next": "14.2.3",
      "notiflix": "^3.2.7",
      "react": "^18",
      "react-dom": "^18",
      "react-hook-form": "^7.51.3",
      "zod": "^3.23.5"
### Depêndencias do Backend
    Desenvolvimento: 
      "@types/cors": "^2.8.17",
      "@types/express": "^4.17.21",
      "@types/node": "^20.12.7",
      "prisma": "^5.13.0",
      "tsconfig-paths": "^4.2.0",
      "typescript": "^5.4.5"
    Produção
      "@prisma/client": "^5.13.0",
      "cors": "^2.8.5",
      "date-fns": "^3.6.0",
      "express": "^4.19.2",
      "express-async-errors": "^3.1.1",
      "reflect-metadata": "^0.2.2",
      "ts-node-dev": "^2.0.0",
      "zod": "^3.23.5"
     
### Diagrama de Entidade-Relacionamento
![ERD](https://github.com/AndreLHPsilva/test-pokedex/assets/112219645/d952c4c6-3cf7-4785-94f0-72ad2bf687c3)

### Imagens do Projeto
![Inicial](https://github.com/AndreLHPsilva/mars-rover/assets/112219645/8b2ddedf-f8e9-4b27-a0b4-a425a9806274)

### Detalhes dos Requisitos para avaliação
Rover de Marte em JavaScript
Um esquadrão de robôs robóticos será pousado pela NASA em um planalto em Marte.

Este planalto, que é curiosamente retangular, deve ser percorrido pelos rovers para que as suas câmeras a bordo possam obter uma visão completa do terreno circundante para enviar de volta à Terra.

A posição e localização de um rover são representadas por uma combinação de coordenadas x e y e uma letra que representa um dos quatro pontos cardeais da bússola. O planalto é dividido em uma grade para simplificar a navegação. Um exemplo de posição pode ser 0, 0, N, o que significa que o rover está no canto inferior esquerdo e voltado para o norte.

Para controlar um rover, a NASA envia uma simples sequência de letras. As letras possíveis são ‘L’, ‘R’ e ‘M’. ‘L’ e ‘R’ fazem o rover girar 90 graus para a esquerda ou para a direita, respectivamente, sem se mover do seu local atual. ‘M’ significa avançar um ponto da grade e manter o mesmo rumo.

Suponha que o quadrado diretamente ao norte de (x, y) seja (x, y 1).

Entrada
A primeira linha de entrada são as coordenadas superiores direitas do planalto, as coordenadas inferiores esquerdas são consideradas 0,0.

O resto da entrada são informações relativas aos rovers que foram implantados. Cada rover possui duas linhas de entrada. A primeira linha indica a posição do rover e a segunda linha é uma série de instruções que dizem ao rover como explorar o planalto.

A posição é composta por dois números inteiros e uma letra separados por espaços, correspondendo às coordenadas xey e à orientação do rover.

Cada rover será finalizado sequencialmente, o que significa que o segundo rover não começará a se mover até que o primeiro termine de se mover.

Saída
A saída para cada rover deve ser suas coordenadas finais e direção.

Exemplo de dados móveis
Exemplo 1
Posição de pouso: 1 2 N
Instrução: LMLMLMLMM
Posição final: 1 3 N

Exemplo 2
Posição de pouso: 3 3 E
Instrução: MRRMMRMRRM
Posição Final: 2 3 S

O que esperamos
A aplicação deve permitir que o usuário interaja com ela para definir o tamanho do platô e os dados do rover.

Avaliaremos a estrutura do seu código, legibilidade, organização, código limpo e, claro, se a aplicação funciona conforme o esperado.

É preciso que você salve os logs das direções enviadas para um banco de dados.

Exemplificando: Caso usuário x aplique uma direção xyz, xyz entram em um backlog através de um banco de dados criado por você.

Ao finalizar ele, peço que faça o upload no Github e me envie o link para acesso.


