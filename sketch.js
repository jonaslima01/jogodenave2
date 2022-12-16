const largura = 500;    //largura da tela do jogo
const altura = 500;     //altra da tela do jogo
const imagem = {}       //dicionário que guarda as imagens do jogo
const som = {}          //dicionário que guarda os sons do jogo
const musica = {}       //dicionário que guarda as musicas do jogo

class Main{//classe responsável pelos menus, fases e pause do jogo
  constructor(){//função chamada sempre que um obj Main é criado
    this.GameOver = false;//responsável por chamar a tela de morte
    this.fase = 0;//responsável por chamar as fases do jogo
    this.pause = false;//responsável por chamar o menu de pause
    this.pause_time = 10//responsável por bloquear botões entre menus
    this.tamanho = 125;//tamanho das imagens das naves no primeiro menu
    this.skin = imagem.nave_vermelha;//inicia com a nave vermelha selecionada
    this.sons = [som.tiro,som.explosao];//vetor de sons
    this.musicas = [musica.boss,musica.menu,musica.fase,musica.game_over];//vetor de musicas
    this.Slider_Volume_Geral = createSlider(0, 1, 0.1,0.1);//slider de volume geral
    this.Slider_Volume_Geral.position(-50,-50);//posiciona o slide fora da tela
    this.Slider_Volume_Geral.style('width', '400px');//diz o tamanho do slider
    this.Slider_Volume_Music = createSlider(0,1,0.1,0.1);//slider de volume das musicas
    this.Slider_Volume_Music.position(-50,-50);//posiciona o slide fora da tela
    this.Slider_Volume_Music.style('width', '400px');//diz o tamanho do slider
    this.Slider_Volume_Efect = createSlider(0,1,0.1,0.1);//slider de volume dos sons
    this.Slider_Volume_Efect.position(-50,-50);//posiciona o slide fora da tela
    this.Slider_Volume_Efect.style('width', '400px');//diz o tamanho do slider
    this.fundo1 = -398;//responsável pela posição y da primeira imagem de fundo
    this.fundo2 = -1308;//responsável pela posição y da segunda imagem de fundo
    this.velocidade_fundo = 5;//responsável pela velocidade das imagens de fundo
    this.imagem_fundo = imagem.fundo;//imagem de fundo
    this.play = false;//responsável por chamar a musica apenas uma vez
    this.musica_atual = musica.boss
  }
  
  Stage(){//função membro responsável pelas fases do jogo.
    if(this.fase == 0){
      background(0);
      if(!this.play){
        this.musica_atual.loop();
        this.play = true;
      }
      this.fundo();
      let nome_jogo = new Display(largura/10,altura/7);//cria um obj Display
      let game_start = new Display(largura/4,altura/1.1);//cria um obj Display
      let game_info = new Display(largura/12,altura/1.4);//cria um obj Display
      let selecione = new Display(largura/7,altura/3.5);//cria um obj Display
      nome_jogo.Escreve("O Increvelmente Difícil e Rapido Jogo de Nave da Minha Rua 2",14,"white");//chama o método Escreve do obj
      selecione.Escreve("escolha uma nave:",40,"white");//chama o método Escreve do obj
game_info.Escreve("use W, A, S, D ou as setas ↥, ↤, ↧, ↦ para mover \n                           clique para atirar!",20,"white");//chama o método Escreve do obj
      let nave1 = new Display(largura/20,altura/3);//cria um obj Display
      let nave2 = new Display(largura/2.8,altura/3);//cria um obj Display
      let nave3 = new Display(2*largura/3,altura/3);//cria um obj Display
      imageMode(CORNER);//desenha na tela as imagens das naves
      image(imagem.nave_vermelha, nave1.x, nave1.y,this.tamanho, this.tamanho);
      image(imagem.nave_azul, nave2.x, nave2.y, this.tamanho, this.tamanho);
      image(imagem.nave_amarela, nave3.x, nave3.y, this.tamanho,this.tamanho);
      if(mouseX > nave1.x && mouseY > nave1.y  && mouseX < nave1.x + this.tamanho && mouseY < nave1.y + this.tamanho){//se colocar o mouse sobre a primeira nave
        image(imagem.moldura, nave1.x, nave1.y, this.tamanho, this.tamanho);//coloca uma moudura em volta da imagem da nave
        if(mouseIsPressed){this.skin = imagem.nave_vermelha;}//se clicar a imagem da nave vermelha será selecionada
      }
      if(mouseX > nave2.x && mouseY > nave2.y  && mouseX < nave2.x + this.tamanho && mouseY < nave2.y + this.tamanho){//se colocar o mouse sobre a segunda nave
         image(imagem.moldura, nave2.x, nave2.y, this.tamanho, this.tamanho);//coloca uma moudura em volta da imagem da nave
        if(mouseIsPressed){this.skin = imagem.nave_azul;}//se clicar a imagem da nave azul será selecionada
    }
      if(mouseX > nave3.x && mouseY > nave3.y  && mouseX < nave3.x + this.tamanho && mouseY < nave3.y + this.tamanho){////se colocar o mouse sobre a terceira nave
        image(imagem.moldura, nave3.x, nave3.y, this.tamanho, this.tamanho);//coloca uma moudura em volta da imagem da nave
        if(mouseIsPressed){this.skin = imagem.nave_amarela;}//se clicar a imagem da nave amarela será selecionada
      }
      if(this.skin == imagem.nave_vermelha){
        image(imagem.moldura, nave1.x, nave1.y, this.tamanho, this.tamanho);//se a imagem selecionada for a vermelha coloca uma moudura em volta
      }
      if(this.skin == imagem.nave_azul){
        image(imagem.moldura, nave2.x, nave2.y, this.tamanho, this.tamanho);//se a imagem selecionada for a azul coloca uma moudura em volta
      }
      if(this.skin == imagem.nave_amarela){
        image(imagem.moldura, nave3.x, nave3.y, this.tamanho, this.tamanho);//se a imagem selecionada for a amarela coloca uma moudura em volta
      }
      if(mouseX > game_start.x && mouseY > game_start.y - 40 && mouseX < game_start.x + 260 && mouseY < game_start.y && this.pause_time < 0){//se o mouse estiver sobre o nome "Game Start" e o tempo de bloqueio já tiver acabado
        game_start.Escreve("Game Start",50,"red");//o nome "Game Start" fica vermelho
        if(mouseIsPressed){//se clicar no nome
          this.pause_time = 10;//re inicia o tempo de bloqueio
          this.jogador = new Nave(this.skin);//cria um obj Jogador passando a imagem da nave selecionada como parâmetro
          this.arma = new Arma();//cria um obj Arma
          this.spaw = new Spaw();//cria um obj Spaw
          this.musica_atual.stop();//para a musica do menu
          this.musica_atual = musica.fase;//musica atual recebe musica de fase
          this.play = false;//a proxima musica pode ser tocada
          this.fase++;//passa para a proxima fase
        }
      }
      else{game_start.Escreve("Game Start",50,"white")}//se não estiver com o mouse sobre o nome escreve o nome "Game Start" de branco
    }
    
    
    if(this.fase >= 1 && this.fase < 4){//enquanto a fase for maior que 1 e menor que 4
      background(0);
      this.fundo();//chama a função membro que gera o fundo
      if(!this.GameOver){ //se Game Over não for true
        if(this.jogador.vida<=0){//se a vida do jogador for menor ou igual a 0
          this.musica_atual.stop();//para a musica
         this.musica_atual = musica.game_over;//recebe a musica de game over
          this.play = false;//pode tocar a proxima musica
          this.GameOver = true;//Game Over recebe true
        }
        this.jogador.Draw_Player();//desenha a nave
        this.jogador.Mouse_pos();//atualiza a posição do mouse em relação a nave
        this.jogador.Interface();//escreve as informações do jogador na tela
        this.jogador.Move();//atualiza a posição do jogador
        this.arma.Mult_Shot();//atualiza a função de tiros multiplos da arma
        this.arma.Recarregar();//atualiza a função de recarregar a arma
        this.arma.tiro.forEach(tiro => {//a cada tiro no vetor de tiros do obj arma
          if(tiro){//se esse tiro não for indefinido
             tiro.Draw();//desenha o tiro
             tiro.Tragetoria();//atualiza a posição do tiro
             if(this.spaw){//se o obj spaw existir
                tiro.Testa_Colisao(this.spaw.inimigo);//chama a funcão membro de cada obj tiro passando um vetor de objs inimigo
             }
          }
        });
      }else{this.Game_Over();}//se Game Over for true chama a função membro Game_Over
    }
    
    if(this.fase == 1){//se fase for igual a 1
      if(!this.GameOver){//se não for Game Over
        if(!this.play){//se a musica não começou
          this.musica_atual.loop();//toca a musica em loop
          this.play = true;//evita que a musica seja iniciada em loop
        }
        this.spaw.posiciona_inimigos("meteoro",10);//chama a função membro do obj spaw passando como parâmetro "meteoro" e 10
        this.Spaw_comands();//chama a função membro
        this.spaw.Interface("meteoro");//chama a função membro do obj spaw passando como parâmetro "meteoro"
      }
      if(this.spaw.mortos_meteoro >= 30){//se o número de obj meteoro que foram mortos for maior ou igual a 30 
        this.fase++;//chama a proxima fase
      }
    }
    
    
    if(this.fase == 2){//se fase for igual a 1
      if(!this.GameOver){//se não for Game Over
        this.spaw.posiciona_inimigos("nave",4);//chama a função membro do obj spaw passando como parâmetro "nave" e 2
        this.Spaw_comands();//chama a função membro
        this.spaw.Interface("nave");//chama a função membro do obj spaw passando como parâmetro "nave"
      }
      if(this.spaw.mortos_nave >= 20){//se o número de obj nave que foram mortos for maior ou igual a 20
        this.fase++;//chama a proxima fase
        this.musica_atual.stop()//para a musica
        this.musica_atual = musica.boss;//recebe a musica da fase do boss
        this.play = false;//a proxima musica pode ser tocada
      }
    } 
    
    if(this.fase == 3){//se fase for igual a 3
      if(!this.GameOver){//se não for Game Over
        if(!this.play){//se a musica não começou
          this.musica_atual.loop();//toca a musica em loop
          this.play = true;//evita que a musica seja iniciada em loop
        }
        this.spaw.posiciona_inimigos("boss");//chama a função membro do obj spaw passando como parâmetro "boss"
        this.spaw.inimigo[0].Ataque();//chama a função membro do obj que está na posição 0 do vetor de objs
        this.Spaw_comands();//chama a função membro
        this.spaw.Interface("boss");//chama a função membro do obj spaw passando como parâmetro "boss"
      }
      if(this.spaw.mortos_boss >= 1){//se o número de obj boss que foram mortos for maior ou igual a 1
        this.fase++;//chama a proxima fase
        this.musica_atual.stop();//para a musica
      }
      
    }
    
    if(this.fase == 4){//se fase for igual a 4
      background(0);//colore o fundo de preto
      let parabens = new Display(largura/4,altura/8);//cria um obj Display
      parabens.Escreve("Parabéns!",50,"white");//chama a função Escreve do obj
      let meteoros = new Display(largura/12,altura/4);//cria um obj Display
      meteoros.Escreve("Meteoros derrotados: "+this.spaw.mortos_meteoro,20,"white");//chama a função Escreve do obj
      let naves = new Display(largura/12,altura/4 + 60);//cria um obj Display
      naves.Escreve("Naves derrotadas: "+this.spaw.mortos_nave,20,"white");//chama a função Escreve do obj
      let fantasma_comum = new Display(largura/12,altura/4 + 120);//cria um obj Display
      fantasma_comum.Escreve("Fantasmas cumuns derrotados: "+this.spaw.mortos_comum,20,"white");//chama a função Escreve do obj
      let fantasma_atirador = new Display(largura/12,altura/4 + 180);//cria um obj Display
      fantasma_atirador.Escreve("Fantasmas atiradores derrotados: "+this.spaw.mortos_atirador,20,"white");//chama a função Escreve do obj
      let main_menu = new Display(largura/4,altura / 1.2);//cria um obj Display
      textSize(50);//tamanho da fonte recebe 50
      if(mouseX > main_menu.x && mouseY > main_menu.y - 40 && mouseX < main_menu.x + 260 && mouseY < main_menu.y && this.pause_time < 0){//se o mouse estiver sobre "Main Menu"
      fill("red");//preenche de vermelho
      text("Main Menu",main_menu.x,main_menu.y);//escreve na tela
      if(mouseIsPressed){
        this.musica_atual = musica.menu;//recebe a musica do menu inicial
        this.play = false;//a proxima musica pode ser tocada
        this.pause_time = 10;//tempo de bloqueio recebe 10
        this.fase = 0;//volta para o menu inicial
      }
      }else{//se o mouse não estiver sobre "Main Menu"
        fill("white");//prencre de branco
        text("Main Menu",main_menu.x,main_menu.y);//escreve na tela
      }
    }

  } 
  Spaw_comands(){//função membro responsavel por chamar funçoes membro dos inimigos
    this.spaw.inimigo.forEach(inimigo => {//a cada obj no vetor de objs inimigos
      if(inimigo){//se existir
        inimigo.Draw_Enemy();//chama a função membro responsavel por desenhar na tela
        inimigo.Move();//chama a função membro responsavel por atualizar a posição
        inimigo.saiu();//chama a função membro responsavel por verificar se saiu do campo de visão
        inimigo.Testa_Colisao(this.jogador);//função membro responsavel por verificar se o obj colidiu com a nave do jogador
      }
    });
    this.spaw.explosion.forEach(kabum => {//a acada obj no vetor de explosões
      if(kabum){//se existe
        kabum.explodir();//chama a função membro responsavel por fazer as animaçoes de explosões
      }
    });
    
  }
  
  Game_Over(){//função membro responsavel pela tela de morte
    if(!this.play){//se a musica não começou
        this.musica_atual.loop();//toca a musica em loop
        this.play = true;//evita que a musica seja iniciada em loop
    }
    background(0);//pinta o fundo de preto
    let game_over = new Display(largura/4,altura/2);//cria um obj Display
    if(mouseX > game_over.x && mouseY > game_over.y - 40 && mouseX < game_over.x + 260 && mouseY < game_over.y){//se o mouse estiver sobre "Game Over"
      game_over.x = largura/3;//o x do obj recebe a variável global largura dividida por 3
      game_over.Escreve("Restart?",50,"white");//chama a função membro Escreve do obj
      if(mouseIsPressed){//se clicar
        this.musica_atual.stop();//para a musica de game over
        this.musica_atual = musica.menu;//recebe a musica do menu inicial
        this.play = false;//a proxima musica pode ser tocada
        this.fase=0;//volta para o menu inicial
        this.pause_time = 10;//tempo de bloqueio recebe 10
        this.GameOver = false;//GameOver recebe false
      }
      }else{//se o mouse não estiver sobre "Game Over"
        game_over.Escreve("Game Over",50,"red");//chama a função membro Escreve do obj
      }
  }
  
  Pause() {//função membro responsavel pela pausa do jogo
    this.pause_time--;//responsável por bloquear momentaneamente a função membro Pause quando ela for acionada
    if(keyIsDown(27) && this.pause_time<0 && this.fase >= 1 && !this.GameOver){//se a techa Esc for acionada e o tempo de bloqueio for menor que 0 e fase for maior ou igual a 1 e GameOver for igual a false
      if (this.pause) {//se pause for true
        this.pause = false;//pause recebe false
        this.pause_time = 10;//tempo de bloqueio recebe 10
      } else {//se pause for false
        this.pause = true;//pause recebe true
        this.pause_time = 10;//tempo de bloqueio recebe 10
        fill(0,0,0,63);//preenche de preto com transparência
        rect(0,0,largura,altura);//cria um retángulo do tamanho da tela
        this.musica_atual.stop();
      }
    }
    if(this.pause){//se pause for true
      fill("white");//preenche de branco
      textSize(50);//tamanho da fonte recebe 50
      text("Pause Menu",40,altura / 8);//escreve na tela
      let volume_geral = new Display(largura/10,altura/4);//cria um obj Display
      volume_geral.Escreve("Volume Geral",20,"white");//chama a função membro do obj Display
      this.Slider_Volume_Geral.position(volume_geral.x - 3,volume_geral.y + 2);//posiciona o obj slider na tela
      let volume_music = new Display(largura/10,altura/2.7);//cria um obj Display
      volume_music.Escreve("Volume Music",20,"white");//chama a função membro do obj Display
      this.Slider_Volume_Music.position(volume_music.x - 3,volume_music.y + 2);//posiciona o obj slider na tela
      let volume_efect = new Display(largura/10,altura/2);//cria um obj Display
      volume_efect.Escreve("Volume Efect",20,"white");//chama a função membro do obj Display
      this.Slider_Volume_Efect.position(volume_efect.x - 3,volume_efect.y + 2);//posiciona o obj slider na tela
      
      
      textSize(50);//tamanho da fonte recebe 50
      if(mouseX > 40 && mouseY > 418 && mouseX < 190 && mouseY < 455){// se o mouse estiver sobre "Return"
        fill("red");//preenche  de vermelho
        text("Return",40,altura / 1.1);//escreve na tela 
        if(mouseIsPressed){
          this.musica_atual.play()
          this.pause = false;
        }//se clicar pause recebe false e continua o jogo
      }else{// se o mouse não estiver sobre "Return"
        fill("white");//preenche de branco
        text("Return",40,altura / 1.1);//escreve na tela
      }
      if(mouseX > 40 && mouseY > 300 && mouseX < 285 && mouseY < 340){// se o mouse estiver sobre "Main Menu"
        fill("red");//preenche  de vermelho
        text("Main Menu",40,altura / 1.5);//escreve na tela
        if(mouseIsPressed){//se clicar
          this.musica_atual = musica.menu;
          this.play = false;//toca novamente a musica
          this.pause = false; // pause recebe false
          this.fase = 0;// volta para o menu inicial
        }
      }else{// se o mouse não estiver sobre "Main Menu"
        fill("white");//preencre de branco
        text("Main Menu",40,altura / 1.5);//escreve na tela
      }
      
    }else{//se pause for false
      if(this.Slider_Volume_Efect.value() < this.Slider_Volume_Geral.value()){//se o valor do slider de volume de efeito for menor do que o valor do slider de volume geral
    this.sons.forEach(song => {//para cada som no vetor de sons
      song.setVolume(this.Slider_Volume_Efect.value());//o volume do som recebe o valor do slider de efeitos
    });
      }else{//se o valor do slider de volume de efeito for maior do que o valor do slider de volume geral
        this.sons.forEach(song => {//para cada som no vetor de sons
          song.setVolume(this.Slider_Volume_Geral.value());//o volume do som recebe o valor do slider de volume geral
        });
      }
      
      if(this.Slider_Volume_Music.value() < this.Slider_Volume_Geral.value()){//se o valor do slider de volume de efeito for menor do que o valor do slider de volume geral
    this.musicas.forEach(music => {//para cada som no vetor de sons
      music.setVolume(this.Slider_Volume_Music.value());//o volume do som recebe o valor do slider de efeitos
    });
      }else{//se o valor do slider de volume de efeito for maior do que o valor do slider de volume geral
        this.musicas.forEach(music => {//para cada som no vetor de sons
          music.setVolume(this.Slider_Volume_Geral.value());//o volume do som recebe o valor do slider de volume geral
        });
      }
      this.Slider_Volume_Geral.position(-50,-50);//esconde o slider fora da tela
      this.Slider_Volume_Music.position(-50,-50);//esconde o slider fora da tela
      this.Slider_Volume_Efect.position(-50,-50);//esconde o slider fora da tela
    }
    
  }
  
  fundo(){//função membvro responsável por criar o fundo do cenário
    this.fundo1 += this.velocidade_fundo;//a posição y da primeira imagem do cenário é somada a ela mesma mais a velocidade do movimento
    this.fundo2 += this.velocidade_fundo;//a posição y da segunda imagem do cenário é somada a ela mesma mais a velocidade do movimento
    imageMode(CORNER);//desenha as imagens
    image(this.imagem_fundo,0,this.fundo1,512, 910);
    image(this.imagem_fundo,0,this.fundo2,512, 910);
    if(this.fundo1 >= 512){//se a primeira imagem sair do campo de visão
    this.fundo1 = -1308;//posiciona a imagem acima da segunda imagem
    }
  if(this.fundo2 >= 512){//se a segunda imagem sair do campo de visão
    this.fundo2 = -1308;//posiciona a imagem acima da primeira imagem
    }
  }
  
}

class Display{//classe responsável por guardar posiçoes x e y alem de colocar na tela textos ou figuras geométricas
  constructor(x,y){//função chamada sempre que um obj Display é criado recebe dois parâmetros x e y
    this.x = x;//guarda o parâmetro x na instância x
    this.y = y;//guarda o parâmetro y na instância y
  }
  
  Escreve(info = "",tamanho = 2,cor = "white"){//função membro responsável por escrever na tela, recebe 3 parâmetros sendo um opcional que é a cor que caso não seja explicitado receberá branco
    this.size = tamanho;//guarda o parâmetro tamanho na instância size
    this.info = info;//guarda o parâmetro info na instância info
    this.color = cor;//guarda o parâmetro cor na instância cor
    fill(this.color);//preenche com a cor da instância cor
    textSize(this.size);//o tamanho da fonte recebe o tamanho da instância tamanho
    text(this.info,this.x,this.y);//escreve o que está na instância info na posição da instância x e da instância y
  }
  
  desenho(formato,largura,altura = 0,cor = "black"){//função membro responsável por desenhar uma figura geométrica na tela, recebe 4 parâmetros sendo 2 opcional que é a altura que caso não seja explicitado receberá 0 e a cor que caso não seja explicitado receberá preto
    fill(cor);//preenche com a cor que vir pelo parâmetro,que caso não seja explicitado será preto 
    switch (formato){//selecione dependendo do parâmetro formato
      case "r"://caso formato seja igual a "r"
        rect(this.x,this.y,largura,altura);//desenha um retâgulo posicionado na instância x e na instância y, de largura igual ao parâmetro largura e altura igual ao parâmetro altura
        break;//para
      case "c"://caso formato seja igual a "c"
        circle(this.x,this.y,largura);//desenha um circulo posicionado na instância x e na instância y, de raio igual ao parâmetro largura
        break;//para
      case "e"://caso formato seja igual a "e"
        ellipse(this.x,this.y,largura,altura);//desenha uma ellipse com seu centro posicionado na instância x e na instância y, de raio 1 igual ao parâmetro largura e raio2 igual ao parâmetro altura
        break;//para
      case "s"://caso formato seja igual a "s"
        square(this.x,this.y,largura,altura);//desenha um quadrado posicionado na instância x e na instância y, de largura igual ao parâmetro largura e altura igual ao parâmetro altura
        break;//para
    }
    
  }
}

class Nave{//classe responsável por criar um obj nave e suas funçoes
    constructor(skin = imagem.nave_vermelha){//inicia sempre que um obj nave é criado e pode ou não receber um parâmetro, caso não receba considera como recebido a imagem da nave vermelha
      this.skin = skin;//a instâcia skin recebe o que vem pelo parâmetro skin
      this.escala = 1.5;//responsável pela escala da proporção da imagem da nave
      this.escala_fogo = 0.5;//responsável pela escala da proporção das imagens do fogo da nave
      this.raio = largura / 15; //raio no qual a nave ocupa no espaço do jogo
      this.x = largura / 2;//posição x inicial da nave
      this.y = altura / 2;//posição y inicial da nave
      this.velocidade = 5;//velocidade da nave
      this.angulo = 0.0;//angulo entre a nave e o mouse iniciado como 0.0
      this.vida = 300;//vida do obj nave
      this.tamanho_vida = (250 / this.vida);//calculo para que independente do valor da instância vida a barra de vida inicie sempre do mesmo tamanho no layout do jogo
      this.fogo = imagem.fogo;//guarda um vetor de imagens de fogo
      this.frame = 0;//responsável por dizer qual imagem da animação do fogo deve aparecer
      this.slow = 0;//reponsável por desacelerar a animação do fogo
      this.tempo_frame = 3;//reponsável por dizer o quanto desacelerar a animação do fogo
      this.ultimo_frame = 3;//diz quantas imagens tem no vetor de imagens de fogo
      this.fator_correcao = PI / 2;//diz quanto a imagem deve ser rotacionada para que fique apontando para o mouse
    }
  
      Draw_Player(){//desenha o jogador
        if(this.vida>0){//se a vida do jogador for maior que 0
          push();//o que vem aseguir funciona apenas no que está descrito abaixo
          translate(this.x, this.y);//a partir do centro da nave
          rotate(this.angulo + this.fator_correcao);//rotacione a nave para ficar de frente ao mouse
          imageMode(CENTER);
          image(this.skin, 0, 0, this.escala * this.raio, this.escala * this.raio);//posiciona a imagem da nave no centro da rotação que é nas instâncias x e y com a largura e altura da escala vezes o raio 
          this.slow++;//a instância acrecenta 1 ao seu proprio valor
          if(this.slow >= this.tempo_frame){//se slow for maior ou igual ao tempo por frame
            this.frame++;//mostra a proxima imagem no vetor de imagem
            this.slow = 0;//slow volta a ser 0
          }
          if(this.frame > this.ultimo_frame){this.frame = 0}//se a imagem a ser mostrada for maior do que o tamanho do vetor de imagens volte para a primeira imagem
          if(this.skin == imagem.nave_azul){//se a imagem da nave for a azul
            image(this.fogo[this.frame], 0, this.raio / 1.5, this.escala_fogo * this.raio, this.escala_fogo * this.raio);//posiciona o fogo corretamente
          }
          if(this.skin == imagem.nave_amarela){//se a imagem da nave for a amarela
            image(this.fogo[this.frame], 1, this.raio / 1.5, this.escala_fogo * this.raio, this.escala_fogo * this.raio);//posiciona o fogo corretamente
          }
          if(this.skin == imagem.nave_vermelha){//se a imagem da nave for a vermelha
            image(this.fogo[this.frame], 1, this.raio / 1.4, this.escala_fogo * this.raio, this.escala_fogo * this.raio);//posiciona o fogo corretamente
          }
          pop();//a partir daqui as funcionalidades descritas acima não tem mais efeito
        }else{//se vida for menor ou igual a 0
          menu.GameOver = true;//a instância do obj menu GameOver recebe true
        }
      }
  
    Mouse_pos(){//define o ângulo entre a nave e a posição do mouse
      this.dx = mouseX - this.x;
      this.dy = mouseY - this.y;
      this.angulo = atan2(this.dy, this.dx);//o ângulo é dado pelo arco tangente das distâncias entre as posições x e y da nave e do mouse
    }
  
    Move(){//função responsável pelo movimento do jogador
      if(keyIsDown(38)||keyIsDown(87)){//se a tecla "W" ou a seta para cima for precionada
        if(this.y - this.raio / 2 >= 0){//se o jogador não estiver encostado na parte superior da tela
        this.y -= this.velocidade;//decrementa a posição y da nave o valor da velocidade
        }
      }
      
      if(keyIsDown(37)||keyIsDown(65)){//se a tecla "A" ou a seta para esquerda for precionada
        if(this.x - this.raio / 2 >= 0){//se o jogador não estiver encostado na lateral esquerda da tela
        this.x -= this.velocidade;//decrementa a posição x da nave o valor da velocidade
        }
      }
      
      if(keyIsDown(40)||keyIsDown(83)){//se a tecla "S" ou a seta para baixo for precionada
        if(this.y + this.raio / 2 <= altura){//se o jogador não estiver encostado na parte inferior da tela
        this.y += this.velocidade;//acrecenta a posição y da nave o valor da velocidade
        }
      }
      
      if(keyIsDown(39)||keyIsDown(68)){//se a tecla "D" ou a seta para direita for precionada
        if(this.x + this.raio / 2 <= largura){//se o jogador não estiver encostado na lateral direita da tela
        this.x += this.velocidade;//acrecenta a posição x da nave o valor da velocidade
        }
      }
      
    }
  
    Damage(){//responsável por diminuir a vida do jogador
      this.vida -= 5;//decrementa 5 a instância vida
    }
  
    Interface(){//reponsável pelo que deve ser escrito na tela durante o jogo
      this.barra_vida = new Display(largura*0.05,altura*0.92);//cria um obj Display
      this.barra_vida.desenho("r",this.vida * this.tamanho_vida,altura*0.03,"rgb(240,26,26)");//desenha a barra de vida do jogador
    }
  
}

class Arma{//classe responsável por criar objs bala
    constructor(){//função que inicia quando o obj arma é criado
      this.quantidade_balas = 20;//define uma quantidade de disparos simuntâneos posíveis
      this.contador_balas = this.quantidade_balas;//guarda a informação de quantas balas ainda podem ser disparadas
      this.cadencia = 10;//velocidade em que cada disparo pode ser criado
      this.tempo_carregamento = 50;//tempo que demora a recarga automática da arma
      this.tiro = [];//vetor onde os obj balas são armazenados
      this.disparoativo = [];//vetor que guarda as balas que ainda não foram disparadas
      this.contador = new Display(largura*0.65,altura*0.95);//cria um obj Display
    }
  
    Mult_Shot(){//função de tiros multiplos
      if(this.cadencia<=0){ //se cadencia for menor ou igual a 0
        for(let i = 0;i<this.quantidade_balas;i++){
          if(mouseIsPressed && !this.disparoativo[i]){//se o jogador clicar e a bala da vez não foi disparada ainda
              this.dx = mouseX - menu.jogador.x;
              this.dy = mouseY - menu.jogador.y;
              this.angulo = atan2(this.dy, this.dx);//define o ângulo entre o jogador e o mouse
              this.tiro[i] = new Bala(menu.jogador.x, menu.jogador.y,this.angulo,i);//cria um obj Bala
              this.disparoativo[i] = true;//marca esse espaço no vetor como true
              this.contador_balas--;//subitrai 1 do contador de balas
              break;//encerra o loop
            }
        }
      this.cadencia = 10;//cadencia recebe 10
      }
      if(this.contador_balas > 0){this.contador.Escreve("balas restantes " + this.contador_balas,20,"gray");}//se tiver balas disponíveis, escreve na tela
      else{this.contador.Escreve("Recarregando...",20,"gray");}//se não tiver balas disponíveis, escreve na tela
      this.cadencia--;//decrementa o valor de cadencia
    }
  
      Recarregar(){//função responsável por recarregar a arma
        if(this.contador_balas == 0){this.tempo_carregamento--}//se não tiver mais balas disponiveis decrementa o tempo para a recarga automática
        if(this.tempo_carregamento <= 0 || keyIsDown(82)){//se o tempo para recarga automática for menor ou igual a 0
          for(let i = 0;i<this.quantidade_balas;i++){
              this.contador_balas = this.quantidade_balas;//reinicia o contador de balas
              this.disparoativo[i] = false;// reinicia o vetor de balas
          }
          this.tempo_carregamento = 50;//tempo de carregamento volta a ser 50
        }
        
      }
      
      Destrutor(index){//função desponsável por destruir objs bala
        let obj = this.tiro[index]
        if(obj){//se essa bala ainda existir
              this.tiro[index] = undefined;//remove do vetor de balas
        }
      }
}

class Bala{//classe responsável pelas balas disparadas pela arma
    constructor(x,y,angulo,index) {//função que inicia quando o obj bala é criado, recebe 4 parâmetros
      this.x = x;//coordenada x do obj
      this.y = y;//coordenada y do obj
      this.position = new p5.Vector(this.x,this.y);//vetor posição do obj
      this.angulo = angulo; //ângulo no qual o obj foi criado
      this.xdirection = cos(this.angulo);//direção do obj em função de x
      this.ydirection = sin(this.angulo);//direção do obj em função de y
      this.xspeed = 15 * this.xdirection;//velocidade do obj no eixo x
      this.yspeed = 15 * this.ydirection;//velocidade do obj no eixo y
      this.velocity = new p5.Vector(this.xspeed,this.yspeed);//vetor velocidade
      this.raio = 5;//raio do obj
      this.index = index;//posição do vetor de objs no qual esse obj se encontra
      this.escala_x = 2;//escala da imagem do obj no eixo x
      this.escala_y = 5;//escala da imagem do obj no eixo y
      this.skin = imagem.bala;//imagem do obj
      this.fator_correcao = PI / 2;//posiciona a imagem na direção correta
      this.play = false;//responsável por iniciar o som apenas uma vez
      this.som = som.tiro;//som do disparo
    }
  
    Tragetoria(){//responsável por atualizar a posição do obj
      if(this.position.x <= 0 || this.position.x >= largura ||
           this.position.y <= 0 ||this.position.y >= altura){//se estiver fora do cenário
              menu.arma.Destrutor(this.index);//se destroi
      }
      else{//se estiver dentro do cenário
        this.position.add(this.velocity)//atualiza a posição do obj
      }
    } 
  
    Draw(){ 
      if(!this.play){//se o som não iniciou
        this.som.play();//inicia o som
        this.play = true;//play recebe true para evitar que o som seja executado em loop
      }
      push();//o que vem aseguir funciona apenas no que está descrito abaixo
      translate(this.position.x, this.position.y);//a partir na posição atual
      rotate(this.angulo + this.fator_correcao);//rotaciona o obj em relação ao seu ângulo
      imageMode(CENTER);      
      image(this.skin, 0, 0, this.escala_x * this.raio, this.escala_y * this.raio);//posiciona a imagem do obj no centro
      pop();//a partir daqui as funcionalidades descritas acima não tem mais efeito
    }
  
    Testa_Colisao(outros){//responsável por verificar se o obj colidiu com algum outro obj que esteja contido no vetor que veio por parâmetro
      outros.forEach(outro => {//a cada obj contido no vetor
          if(outro){//se existir
            let distanceVect = p5.Vector.sub(outro.position, this.position);//define um vetor distâcia entre os objs

            let distanceVectMag = distanceVect.mag();//pega o valor absoluto da distância

            let minDistance = this.raio / 2 + outro.raio / 2;//define um valor minimo que essa distância deve ter
            
            if (distanceVectMag < minDistance) {//se o valor absoluto da distância for menor que o valor minimo
              this.skin = imagem.bala2;//muda a imagem do obj
              menu.spaw.Damage(outro.index);//chama a função de dano do outro obj
              menu.arma.Destrutor(this.index);//se destroi
            }
          }
      });
    }
  
}

class Bala_Inimigo extends Bala{//herda a classe Bala
  constructor(x,y,angulo,index){//recebe os parâmetros
    super(x,y,angulo,index)//manda os parâmetros para a classe pai
    this.skin = imagem.tiro_boss;//vetor de imagems do obj
    this.play = false;//responsável por tocar o som apenas uma vez
    this.frame = 0;//imagem a ser mostrada do vetor de imagens
    this.slow = 0;////reponsável por desacelerar a animação do obj
    this.tempo_frame = 2;//reponsável por dizer o quanto desacelerar a animação do obj
    this.ultimo_frame = 7;//diz quantas imagens tem no vetor de imagens do obj
    this.raio = 10;//raio do obj
    this.escala = 2;//escala do tamanho das imagens do obj
    this.fator_correcao = PI * 1.5;//rotação da imagem
    this.xspeed = 2 * this.xdirection;//velocidade no eixo x
    this.yspeed = 2 * this.ydirection;//velocidade no eixo y
  }

  Tragetoria(){//responsável pelo movimento do obj
      this.position.add(this.velocity);//atualiza a posição do obj
    
    } 
  
  Draw(){
    if(!this.play){//se o som ainda não tocou
      this.som.play();//toca o som do obj
      this.play = true;//previne que toque o som em loop
    }
    push();//o que vem aseguir funciona apenas no que está descrito abaixo
      translate(this.position.x, this.position.y);//a partir na posição atual
      this.dx = menu.jogador.x - this.position.x;
      this.dy = menu.jogador.y - this.position.y;
      this.angulo = atan2(this.dy, this.dx);//define o ângulo entre o obj e o jogador
      rotate(this.angulo + this.fator_correcao);//rotaciona o obj em relação a esse ângulo
      this.slow++;//acresenta a instância slow
      if(this.slow >= this.tempo_frame){//se slow for maior ou igual ao tempo por frame
        this.frame++;//mostra a proxima imagem
        this.slow = 0;//slow volta a ser 0
      }
      if(this.frame > this.ultimo_frame){this.frame = 0}//se a imagem a ser mostrada não estiver dentro do vetor de imagens volte para a primeira imagem
      imageMode(CENTER);
      image(this.skin[this.frame],0,0, this.escala * this.raio, this.escala * this.raio);//posiciona a imagem do obj no centro
    pop();//a partir daqui as funcionalidades descritas acima não tem mais efeito
    
    }
  
  Testa_Colisao(player){//testa se o obj colidiu com o jogador
    let distanceVectMag = sqrt((player.x-this.position.x)**2+(player.y-this.position.y)**2);//define a distância entre o obj e o jogador
    let minDistance = this.raio + player.raio;//define uma distância minima entre eles
    
    if (distanceVectMag < minDistance) {//se a distância entre o obj e o o jogador for menor que a distância minima
        player.Damage();//o jogador sofre dano
        menu.spaw.inimigo[this.index].Disparo = false;//o obj se destroi
    }
  }
  
}

class Spaw{//classe responsável por criar os inimigos
  constructor(){
    this.inimigo = [];//vetor onde se guarda objs inimigos
    this.cont_index = 13;//posição de inimigos fantasmas no vetor de inimigos
    this.spaw_time = 0;//tempo entre as criações de inimigos
    this.explosion = [];//vetror de explosões
    this.mortos_meteoro = 0;//contador de inimigos mortos do tipo meteoro 
    this.mortos_nave = 0;//contador de inimigos mortos do tipo nave
    this.mortos_boss = 0;//contador de inimigos mortos do tipo boss
    this.mortos_comum = 0;//contador de inimigos mortos do tipo fantasma comum
    this.mortos_atirador = 0;//contador de inimigos mortos do tipo fantasma atirador

  }
  
  posiciona_inimigos(tipo,quantidade = 1){//função responsável por criar e posicionar inimigos, recebe como parâmetro o tipo de inimigo e a quantidade,caso não se expecifique a quantidade cria e posiciona apenas um
    switch (tipo){//selecione dependendo do tipo vindo pelo parâmetro
      case "meteoro"://caso seja "meteoro"
        for(let i = 1;i < quantidade + 1;i++){
          let angulo = random(0,2 * PI);//define um ângulo aleatório
          let x = largura  * cos(angulo) + largura / 2; //define a posição x do inimigo fora da tela e variando dependendo do ângulo 
          let y = altura  * sin(angulo) + altura / 2;//define a posição y do inimigo fora da tela e variando dependendo do ângulo 
          if(this.inimigo[i] == undefined){//se não existir um obj nesta posição do vetor
            this.inimigo[i] = new Inimigo(x,y,i);//cria um obj Inimigo e coloca ele nesta posição do vetor
          }
        }
        break;//para
        
        case "nave"://caso seja "nave"
          for(let i = 11;i < quantidade + 11;i++){
            let angulo = random(0,2 * PI);//define um ângulo aleatório
            let x = largura  * cos(angulo) + largura / 2;//define a posição x do inimigo fora da tela e variando dependendo do ângulo 
            let y = altura  * sin(angulo) + altura / 2;//define a posição y do inimigo fora da tela e variando dependendo do ângulo 
            if(this.inimigo[i] == undefined){//se não existir um obj nesta posição do vetor
      this.inimigo[i] = new Inimigo_nave(x,y,i);//cria um obj Inimigo_nave e coloca ele nesta posição do vetor
            }
          }
        break;//para
        
        case "boss"://caso seja "boss"
          if(this.inimigo[0] == undefined || this.inimigo[0].tipo != "boss"){//se não existir um obj na posição [0] do vetor
            this.inimigo[0] = new Boss();//cria um obj Boss e coloca ele na posição [0] do vetor
          }
        break;//para
        
        case "comum"://caso seja "comum"
            this.cont_index++;//acrecenta o contador do index de fantasmas
            this.inimigo[this.cont_index] = new Fantasma_Comum(this.inimigo[0].position.x,this.inimigo[0].position.y,this.cont_index);//cria um obj Fantasma_Comum e coloca ele na posição [this.cont_index] do vetor
        break;//para
        
        case "atirador"://caso seja "atirador"
          this.cont_index++;//acrecenta o contador do index de fantasmas
          this.inimigo[this.cont_index] = new Fantasma_Atirador(this.inimigo[0].position.x,this.inimigo[0].position.y,this.cont_index);//cria um obj Fantasma_Atirador e coloca ele na posição [this.cont_index] do vetor
        break;//para
    }
    
  }

  Interface(tipo){//mostra na tela as informações sobreos inimigos e recebe como parâmetro o tipo de inimigo que está na tela
    switch (tipo){//selecione dependendo do tipo vindo pelo parâmetro
    case "meteoro": //caso seja "meteoro"
    this.display = new Display(largura * 0.01,altura* 0.05);//cria um obj Display
      this.display.Escreve("meteoros destruidos: " + this.mortos_meteoro,15); //escreve na tela as informações de meteoro destruidos
    break;//para
    
    case "nave"://caso seja 
      this.display = new Display(largura * 0.01,altura* 0.05);//cria um obj Display
      this.display.Escreve("Naves inimigas destruidas: " + this.mortos_nave,15); //escreve na tela as informações de naves destruidas
    break;//para
      
    case "boss"://caso seja "boss"
      this.display = new Display(largura * 0.01,altura* 0.05);//cria um obj Display
      if(this.inimigo[0]){//se existir
        this.display.desenho("r",this.inimigo[0].vida * 4.9,altura*0.03,"red");//desenha na tela a barra de vida do boss
      }
      break;//para
      }
    
  }
  
  Damage(index){//respobnsável por diminuir a vida dos inimigos
    if(this.inimigo[index].vida > 1){//se o inimigo desta posição do vetor tiver a vida maior que 1
    this.inimigo[index].vida--;//reduz 1 da vida deste inimigo
    }else{//se o inimigo desta posição do vetor tiver a vida 1 ou menor
      let obj = this.inimigo[index];
      this.explosion.push(new Explosion_comum(obj.position.x,obj.position.y,obj.raio));//cria um obj Explosion_comum e coloca ele na ultima posição do vetor explosion
      this.Conta_inimigos(this.inimigo[index].tipo);//chama a função membro passando o tipo do inimigo por parâmetro
      this.Destrutor(index);//chama a função membro passando o index do inimigo por parâmetro
    }
    
  }
  
  Destrutor(index){//responsável por destruir os obj Inimigo e seus derivados
    this.inimigo[index] = undefined;//retira o obj do vetor de objs
  }
  
  Conta_inimigos(tipo){//responsável pela contagem de inimigos destruidos
    switch (tipo){//selecione dependendo do tipo vindo pelo parâmetro
      case "meteoro"://se for "meteoro"
        this.mortos_meteoro++;//acrecenta mortos_meteoro
        break;//para
      case "nave"://se for "nave"
        this.mortos_nave++;//acrecenta mortos_nave
        break;
      case "boss"://se for "boss"
        this.mortos_boss++;//acrecenta mortos_boss
        break;
      case "comum"://se for "comum"
        this.mortos_comum++;//acrecenta mortos_comum
        break;
      case "atirador"://se for "atirador"
        this.mortos_atirador++;//acrecenta mortos_atirador
        break;
    }
      
  }
  
}

class Explosion_comum{//responsavel pelas explosões dos inimigos
  constructor(x,y,tamanho){//recebe a posição e o raio do inimigo
    this.x = x;//a posição x é igual a posição x do obj que foi destruido
    this.y = y;//a posição x é igual a posição y do obj que foi destruido
    this.tamanho = tamanho;//o tamanho da esplosão é proporcional ao raio do inimigo
    this.slow = 0 ;//usado para dar fluidez na animação
    this.explosion = imagem.explosao_meteoro;//vetor de imagens da explosão
    this.explosion_frame = 0;//imagem a ser mostrada
    this.tempo_frame = 3;//tempo que demora para trocar a imagem da explosão
    this.ultimo_frame = 5;//tamanho do vetor de imagens
    this.play = false; //responsável por tocar o som apenas uma vez
    this.som = som.explosao;//som da explosão
  }
  
  explodir(){//função que desenha a explosão
    if(!this.play){//se não tocou o som ainda
      this.som.play();//toca o som do obj
      this.play = true;//o som ja tocou
    }
    this.slow++;//incrementa a instância slow
    if(this.slow >= this.tempo_frame){//se slow for maior ou igual ao tempo por frame
      this.explosion_frame++;//mostra a proxima imagem do vetor de imagens
      this.slow = 0;//slow volta a ser 0 
    }
    if(this.explosion_frame <= this.ultimo_frame){//se a imagem a ser mostrada for menor ou igual a ultima imagem do vetor
    imageMode(CENTER);
    image(this.explosion[this.explosion_frame], this.x, this.y, this.tamanho, this.tamanho); //desenha esta imagem
    }
    
  }
  
}

class Inimigo{//classe responsável pelos inimigos
    constructor(x,y,index){//recebe um x um y e um indice
      this.x = x;//posição x do obj
      this.y = y;//posição y do obj
      this.index = index;//indice onde este obj se emcontra no vetor de inimigos
      this.raio = 20;//o raio do obj é 20
      this.velocidade = 2;//a velocidade do obj é 2
      this.vida = 1;//o obj tem vida 1
      this.tipo = "meteoro";//tipo do obj
      this.skin = imagem.meteoro;//imagem do obj
      this.position = new p5.Vector(this.x, this.y);//vetor posição do obj
      this.fator_correcao = PI / 2;//orientação da imagem do obj
      this.escala = 1.5;//escala da imagem do obj
      this.dentro = false;//diz se o obj está dentro da tela do jogo
    }
  
    Draw_Enemy(){//desenha o inimgo
      if(this.entrou()){//se o inimigo entrou na tela do jogo
        push();//o que vem aseguir funciona apenas no que está descrito abaixo
        translate(this.position.x, this.position.y);//a partir na posição atual
        this.dx = menu.jogador.x - this.position.x;
        this.dy = menu.jogador.y - this.position.y;
        this.angulo = atan2(this.dy, this.dx);//define o ângulo entre o obj e o jogador
        rotate(this.angulo + this.fator_correcao);//rotaciona o obj em relação a esse ângulo
        imageMode(CENTER);
        image(this.skin, 0, 0,this.escala * this.raio, this.escala * this.raio); //posiciona a imagem do obj no centro da rotação
        pop();//a partir daqui as funcionalidades descritas acima não tem mais efeito
      }
    }
  
    Move(){//movimenta o inimigo
      this.angulo_move = atan2(this.x - menu.jogador.x, this.y - menu.jogador.y)
      //define o ângulo entre o obj e o jogador
      this.xdirection = -sin(this.angulo_move);//define a direção no eixo x 
      this.ydirection = -cos(this.angulo_move);//define a direção no eixo y
      this.xspeed = this.xdirection ;// define a velocidade no eixo x
      this.yspeed = this.ydirection ;// define a velocidade no eixo y
      this.velocity = new p5.Vector(this.xspeed * this.velocidade, this.yspeed * this.velocidade);//cria um vetor velocidade
      this.position.add(this.velocity);//adiciona ao vetor posição o vetor velocidade
    }
  
    entrou(){//verifica se o obj entrou na tela do jogo
      if(this.position.x - this.raio / 2 > 0 && this.position.y > 0 && this.position.x - this.raio / 2 < largura && this.position.y < altura ){return true}
      else{return false}
    }
  
  saiu(){//verifica se o obj saiu na tela do jogo
    if(this.entrou()){this.dentro = true}
      if(this.dentro == true && this.entrou() == false){
        menu.spaw.Destrutor(this.index)
      }
    
  }
  
  
  Testa_Colisao(player){//testa se o obj colidiu com o jogador
    let distanceVectMag = sqrt((player.x-this.position.x)**2+(player.y-this.position.y)**2);//mede a distancia entre o obj e o jogador
    let minDistance = this.raio / 2 + player.raio / 2;//define uma distânacia minima
    
    if (distanceVectMag < minDistance) {//se a distancia entre o obj e o jogador for menor que a distância minima
        player.Damage();//o jogador sofre dano
        menu.spaw.Damage(this.index);//o obj sofre dano
    }
  }
  
}

class Inimigo_nave extends Inimigo{//herda a classe Inimigo
  constructor(x,y,index){//recebe a posição e o indice por parâmetro
    super(x,y,index)//passa os parâmetros para a classe pai
    this.skin = imagem.nave_inimigo;//define a imagem do obj
    this.velocidade = 2;//velocidade do obj
    this.raio = largura / 15;//raio do obj
    this.vida = 2;//vida do obj
    this.tipo = "nave";//tipo do obj
    this.time_move = 50;//tempo que o obj tem para se movimentar quando entra na tela do jogo
    this.time_reload = 50;//tempo de recarregamento
    this.Disparo = false;//diz se disparou ou não
  }
  
  Move(){//movimenta o obj
    if(this.entrou()){this.time_move--}//se entrou o tempo de movimento começa a diminuir
      if(this.time_move>=0){//se o tempo de movimento for maior ou igual a 0
        this.angulo = atan2(this.position.x - menu.jogador.x, this.position.y - menu.jogador.y);//define o ângulo entre o obj e o jogador
        this.xdirection = -sin(this.angulo);//direção x do obj
        this.ydirection = -cos(this.angulo);//direção y do obj
        this.xspeed = this.xdirection ;//velocidade no eixo x do obj
        this.yspeed = this.ydirection ;//velocidade no eixo y do obj
        this.velocity = new p5.Vector(this.xspeed * this.velocidade, this.yspeed * this.velocidade);//vetor de velocidade do obj
        this.position.add(this.velocity);//atualiza a posição do obj
      }else{//se o tempo de movimento for menor que 0
        this.time_reload--;//diminui o tempo de recarga
        if(this.time_reload<=0){//quando o tempo de recarga for igual menor ou igual a 0
          this.dx = menu.jogador.x - this.position.x;
          this.dy = menu.jogador.y - this.position.y;
          this.angulo = atan2(this.dy, this.dx);//define o ângulo entre o obj e o jogador
          this.Shot();//chama a função membro de atirar
          this.time_reload = 50;//tempo de recarga volta a ser 50
        }
        this.Draw_shot();//chama a função membro que desenha o disparo
      }
    }
  
  Shot(){//função membro responsável por atirar
    if (!this.Disparo) {//se não tem nenum disparo deste obj no jogo
      this.tiro = new Bala_Inimigo(this.position.x,this.position.y,this.angulo,this.index);//cria um obj Bala_Inimigo
      this.Disparo = true;//diz que tem um disparo ativo
    }
  }
  
    Draw_shot(){//função membro responsável por desenhar o disparo
      if(this.Disparo){//se disparo existe
        if(this.tiro.position.x <= 0 || this.tiro.position.x >= largura || this.tiro.position.y <= 0 ||this.tiro.position.y >= altura){this.Disparo = false;} //se o obj Bala_Inimigo criado sair da tela pode disparar novamente.
        this.tiro.Tragetoria();//atualiza a posição o obj Bala_Inimigo
        this.tiro.Draw();//desenha o obj Bala_Inimigo
        this.tiro.Testa_Colisao(menu.jogador);//verifica se há colisão entre o obj Bala_Inimigo e o jogador
      }
      
    }
  
}

class Boss extends Inimigo{//herda Inimigo e é responsável pelas instâncias e funções do inimigo final
  constructor(){
    super(largura / 2,-50,0)//passa para o construtor da clase pai as coordenadas da posição e o index desse obj no vetor de objs da classe Spaw
    this.skin = imagem.boss;//pega a imagem do obj
    this.raio = 100;//raio do obj
    this.vida = 100;//vida do obj
    this.velocidade = 3;//velocidade do obj
    this.tipo = "boss";//tipo do obj
    this.fator_correcao = PI * 1.5;//orientação da imagem
    this.escala = 1;//escala da imagem do obj
    this.Spaw = menu.spaw;//atalho para o spaw (criar inimigos)
    this.spaw_time = 0;//tempo para criar um inimigo fantasma
    this.xdirection = 1;//direção no eixo x do obj
    this.ydirection = 1;//direção no eixo y do obj
    this.vai = true;//movendo para a direita
    this.vem = false;//movendo para a esquerda
    this.sobe = false;//movendo para cima
    this.desce = false;//movendo para baixo
  }
  
  Move(){
    if(this.vida >= 100 / 2){//se a vida for maior que a metade
      this.up_dowm(150,100,1);//chama a função membro up_dowm com os parâmetros: 150, 100 e 1(faz com que o obj se mova para cima e para baixo do y = 100 até y = 150 com velocidade 1)
    }
    
    if(this.vida < 100 / 1.333 && this.vida >= 100 / 2){//se a vida for menor que 75% e maior que a metade
      this.left_right(largura - 50, 50, 2);//chama a função membro left_right com os parâmetros: largura - 50, 50 e 2 (//faz com que o obj se mova de um lado para o outro do x = 50 até x = largura - 50 com velocidade 2)
    }
    
    else if(this.vida < 100 / 2 && this.vida >= 100 / 4){//se a vida for menor que a metade e maior que 25%
      
      if(this.vai){//se vai for true(movimento para a direita)
        this.up_dowm(150,100,this.velocidade)//chama a função membro up_dowm com os parâmetros: 150, 100 e velocidade(faz com que o obj se mova para cima e para baixo do y = 100 até y = 150 com velocidade 3)
        if(this.position.x <= largura - 50){//se o obj não está encostando na parede do lado direito
          this.position.x += this.velocidade;//se aproxima da parede do lado direito
        }else{//se o obj está encostando na parede do lado direito
          this.position.x = largura - 50;//encosta na parede do lado direito
          this.vai = false ;//para de ir para a direita
          this.desce = true;//começa o movimento de descer
        }
      }
      
      if(this.vem){//se vem for true(movimento para a esquerda)
        this.up_dowm(altura - 100,altura - 150,this.velocidade); //chama a função membro up_dowm com os parâmetros: altura - 150, altura - 100 e velocidade(faz com que o obj se mova para cima e para baixo do y = altura - 100 até y = altura - 150 com velocidade 3)
        if(this.position.x >= 50){//se não estiver encostando na parede do lado esquerdo
          this.position.x -= this.velocidade;//se aproxima da parede do lado esquerdo
        }else{//se estiver encostado na parede do lado esquerdo
           this.position.x = 50;//encosta na parede do lado esquerdo
           this.vem = false; //movimento para a esquerda para
           this.sobe = true;//começa o movimento de subida
        }
      }
      
      if(this.desce){//se desce for true(movimento para a baixo)
        this.left_right( largura - 50, largura - 100, this.velocidade);//chama a função membro left_right com os parâmetros: largura - 50, largura - 100 e velocidade(faz com que o obj se mova para esquerda e para direita do x = largura - 50 até x = largura - 100 com velocidade 3)
        if(this.position.y <= altura - 100){//se ainda não chegou em baixo
          this.position.y += this.velocidade;//vai descendo
        }else{//se ainda chegou em baixo
          this.position.y = altura - 100;//para na posição mais baixa
          this.desce = false;//para o movimento de descer
          this.vem = true;//começa o movimento para a esquerda
        }
      }
      
      if(this.sobe){//se sobe for true(movimento para a cima)
        this.left_right(100, 50, this.velocidade);//chama a função membro left_right com os parâmetros: 100, 50 e velocidade(faz com que o obj se mova para esquerda e para direita do x = 100 até x = 50 com velocidade 3)
        if(this.position.y >= 100){//se ainda não chegou me cima
          this.position.y -= this.velocidade;//vai subindo
        }else{//se ainda chegou me cima
          this.position.y = 100;//para na posição mais alta 
          this.sobe = false;//para o movimento de subida
          this.vai = true;//começa o movimento para a direita
        }
      }
      
    }
    
    if(this.vida < 100 / 4){//se a vida estiver menor que 25%
      let angulo = atan2(this.position.x - menu.jogador.x, this.position.y - menu.jogador.y);//determina o ângulo entre o obj e o jogador
      this.xdirection = -sin(angulo);
      this.ydirection = -cos(angulo);
      this.xspeed = this.xdirection ;
      this.yspeed = this.ydirection ;
      this.velocity = new p5.Vector(this.xspeed * this.velocidade, this.yspeed * this.velocidade)
      this.position.add(this.velocity);//move o obj em direção ao jogador
    }
    
  }
  
  Ataque(){//função responsável pelos ataques do obj
    this.spaw_time++
    if(this.vida >= 100 / 2){  //se a vida for maior que 50%
      if(this.spaw_time % 100 == 0){this.Spaw.posiciona_inimigos("comum")}//com uma certa frequência de tempo spawna fantasmas do tipo comum
    }
    if(this.vida <= 100 / 1.333 && this.vida >= 100 / 2){ //se a vida for maior que 50% e menor que 75%
      if(this.spaw_time % 150 == 0){this.Spaw.posiciona_inimigos("atirador")}//com uma certa frequência de tempo spawna fantasmas do tipo atiradores 
    }
    else if(this.vida < 100 / 2 && this.vida >= 100 / 4){//se a vida for menor que 50% e maior que 25%
      if(this.spaw_time % 100 == 0){
        this.Spaw.posiciona_inimigos("comum")
        this.Spaw.posiciona_inimigos("atirador")
      }// spawna fantasmas tipo colisores e do tipo atiradores mais frequêntemente
    }
    
  }
  
  left_right(maximo,minimo,velocidade){//responsável por fazer o obj se mover para um lado e para o outro lado com uma certa velocidade
      if(this.position.x <= minimo){//se o obj chegou no limite para um lado
        this.xdirection = 1;//muda de direção
      }
      if(this.position.x >= maximo){//se o obj chegou no limite para o outro lado
        this.xdirection = -1;//muda de direção
      }
      this.position.x += velocidade * this.xdirection;//move o obj
  }
  
  up_dowm(maximo,minimo,velocidade){//responsável por fazer o obj se mover para cima e para baixo com uma certa velocidade
      if(this.position.y <= minimo){//se o obj chegou no limite para baixo
        this.ydirection = 1;//muda de direção
      }
      if(this.position.y >= maximo){//se o obj chegou no limite para cima
        this.ydirection = -1;//muda de direção
      }
      this.position.y += velocidade * this.ydirection;//move o obj
  }
  
  saiu(){}//sobreecreve a função herdada para não se auto destruir
  
}

class Fantasma_Comum extends Inimigo{//herda Inimigo
  constructor(x,y,index){
    super(x,y,index)//passa os parâmetros para a função pai
    this.skin = imagem.fantasma;//vetor de imagens do obj
    this.slow = 0;//usado para dar fluidez na animação
    this.ultimo_frame = 7;//tamanho do vetor de imagens
    this.tempo_frame = 2;//tempo que demora para trocar a imagem 
    this.frame = 0;//index da imagem do obj a ser mostrada
    this.fator_correcao = PI * 1.5;//orientação das imagens do obj
    this.escala = 1.5;//escala das imagens do obj
    this.vida = 2;//vida do obj
    this.tipo = "comum";//tipo do obj
  }
  
  Draw_Enemy(){//função herdada sobreecrita para usar uma animação
    push();
    translate(this.position.x, this.position.y);
    this.dx = menu.jogador.x - this.position.x;
    this.dy = menu.jogador.y - this.position.y;
    this.angulo = atan2(this.dy, this.dx);//define o ângulo do obj em relação ao player
    rotate(this.angulo + this.fator_correcao);//rotaciona o obj em relação ao player
    this.slow++;//incrementa a instância slow
    if(this.slow >= this.tempo_frame){//se slow for maior ou igual ao tempo por frame
      this.frame++;//mostra a proxima imagem do vetor de imagens
      this.slow = 0;//slow volta a ser 0 
    }
    if(this.frame > this.ultimo_frame){this.frame = 0;}//se a imagem a ser mostrada for maior que a ultima imagem do vetor volta para a primeira imagem
    imageMode(CENTER);
    image(this.skin[this.frame], 0, 0,this.escala * this.raio, this.escala * this.raio);
    pop();
    if(this.position.x + this.raio / 2 <= 0 || this.position.x - this.raio / 2 >= largura ||
       this.position.y + this.raio / 2 <= 0 || this.position.y - this.raio / 2 >= altura){//se o obj sair do mapa
       menu.spaw.Destrutor(this.index);//se destroi
    }
  }
  
}

class Fantasma_Atirador extends Inimigo_nave{//herda Inimigo_nave
  constructor(x,y,index){
    super(x,y,index)//passa os parâmetros para a class pai
    this.skin = imagem.fantasma;//vetor de imagens do obj
    this.slow = 0;//usado para dar fluidez na animação
    this.ultimo_frame = 7;//tamanho do vetor de imagens
    this.tempo_frame = 2;//tempo que demora para trocar a imagem 
    this.frame = 0;//index da imagem a ser mostrada
    this.raio = largura / 15;//raio do obj
    this.fator_correcao = PI * 1.5;//orientação das imagens do obj
    this.velocidade = 3;//velocidade do obj
    this.vida = 3;//vida do obj
    this.tipo = "atirador";//tipo do obj
  }
  
  Draw_Enemy(){//função herdada sobescrita para introduzir a ainimação das imagens do obj
    push();
    translate(this.position.x, this.position.y);
    this.dx = menu.jogador.x - this.position.x;
    this.dy = menu.jogador.y - this.position.y;
    this.angulo = atan2(this.dy, this.dx);//define o ângulo do obj em relação ao player
    rotate(this.angulo + this.fator_correcao);//gira o obj em relação ao player
    this.slow++;//incrementa a instância slow
    if(this.slow >= this.tempo_frame){//se slow for maior ou igual ao tempo por frame
      this.frame++;//mostra a proxima imagem do vetor de imagens
      this.slow = 0;//slow volta a ser 0 
    }
    if(this.frame > this.ultimo_frame){this.frame = 0;}//se a imagem a ser mostrada for maior que a ultima imagem do vetor volta para a primeira imagem
    imageMode(CENTER);
    image(this.skin[this.frame], 0, 0,this.escala * this.raio, this.escala * this.raio);
    pop();
    if(this.position.x + this.raio / 2 <= 0 || this.position.x - this.raio / 2 >= largura ||
       this.position.y + this.raio / 2 <= 0 || this.position.y - this.r / 2 >= altura){//se estiver fora do mapa
       menu.spaw.Destrutor(this.index);//se destroi
    }
  }
  
  entrou(){
    return true
  }
  
}

function setup() {//responsável pelas configurações antes do loop de desenho
  createCanvas(largura, altura);//define o tamanho da tela do jogo
  menu = new Main();//cria um obj Main
}

function preload() {//responsável por carregar as imagens, os sons e as musicas
  soundFormats('mp3', 'ogg','wav');
  som.explosao = loadSound("sons/explosao.wav")
  som.tiro = loadSound("sons/tiro.mp3")
  musica.boss = loadSound("musicas/bossbattle.ogg")
  musica.fase = loadSound("musicas/fases1e2.ogg")
  musica.game_over = loadSound("musicas/game_over.ogg")
  musica.menu = loadSound("musicas/menu.ogg")
  imagem.nave_vermelha = loadImage('imagens/navevermelha.png');
  imagem.nave_amarela = loadImage('imagens/naveamarela.png');
  imagem.nave_inimigo = loadImage('imagens/naveinimigo.png');
  imagem.boss = loadImage('imagens/boss.png');
  imagem.nave_azul = loadImage('imagens/naveazul.png');
  imagem.bala = loadImage('imagens/bullet.png');
  imagem.bala2 = loadImage('imagens/bullet2.png');
  imagem.fundo = loadImage('imagens/fundo.png');
  imagem.moldura = loadImage('imagens/moldura.png');
  imagem.meteoro = loadImage('imagens/meteoro.png');
  
  imagem.fantasma = []
  for(let i=0; i <= 7; i++){
    imagem.fantasma[i] = loadImage('anima/fantasma/fantasma'+i+'.png')
  }
  
  imagem.fogo = []
  for(let i=0; i <= 3; i++){
    imagem.fogo[i] = loadImage('anima/fogo/fogo'+i+'.png')
  }
  
  imagem.tiro_boss = []
  for(let i=0; i <= 7; i++){
    imagem.tiro_boss[i] = loadImage('anima/tiro_boss/tiroboss'+i+'.png')
  }
  
  imagem.explosao_meteoro = []
  for(let i=0; i <= 5; i++){
    imagem.explosao_meteoro[i] = loadImage('anima/exposao_meteoro/exp'+i+'.png')
  }
  
  imagem.explosao_boss = []
  for(let i=0; i <= 8; i++){
    imagem.explosao_boss[i] = loadImage('anima/exposao_boss/explosion'+i+'.png')
  }
  
}

function draw() {//loop responsável por desenhar na tela o que acontece no jogo
  menu.Pause();//função de pause do obj Main
  if(!menu.pause){menu.Stage()}//se não setiver pausado:desenha a fase atual
  
}