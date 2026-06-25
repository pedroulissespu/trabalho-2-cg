# Shooter Aimlab Simulator

Jogo 3D de treino de mira desenvolvido com **WebGL puro** para a disciplina de Computação Gráfica.

## Descrição

O jogador é colocado dentro de uma sala 3D e deve clicar nos alvos humanoides que aparecem e se movem pelo ambiente. O jogo dura **30 segundos** e calcula pontuação, acertos e precisão.

## Requisitos Atendidos

| Requisito | Implementação |
|---|---|
| Câmera FPS com projeção perspectiva | `createPerspective()` + `createCamera()` com yaw/pitch |
| Iluminação Phong | Vertex + Fragment shader com ambiente, difuso e especular |
| Luz animada | Point light que orbita a sala em círculo |
| Objetos animados (transformações geométricas) | Alvos com pop-in de escala, bob senoidal e translação circular |
| Objeto com textura | Chão e paredes com texturas geradas proceduralmente |
| Objeto com cor sólida | Alvos coloridos e teto |
| Leitor OBJ próprio | `obj-loader.js` — implementado do zero, sem bibliotecas |
| Modelo OBJ | `assets/gun.obj` — pistola modelada manualmente |
| Interação teclado/mouse | WASD + mouse (Pointer Lock API) + clique para atirar |
| WebGL puro | Zero uso de three.js ou similar |
| Álgebra linear | `math.js` |

## Estrutura do Projeto

```
trabalho-2-cg/
├── index.html       # Jogo completo (shaders GLSL inline, lógica principal)
├── obj-loader.js    # Leitor próprio de arquivos OBJ
├── geometries.js    # Geometrias procedurais (esfera UV, cubo, quad)
├── assets/
│   └── ...      # Todos os assets utilizados no jogo
└── README.md
```

## Como Executar

O jogo usa `fetch()` para carregar o arquivo OBJ, portanto precisa de um servidor HTTP local (não abre direto pelo sistema de arquivos).

### Opção 1 — Python (recomendado)
```bash
cd aimlab
python -m http.server 8080
# Abra: http://localhost:8080
```

### Opção 2 — Node.js
```bash
npx serve aimlab
```

### Opção 3 — Live Server (VS Code)
Clique com botão direito em `index.html` → **Open with Live Server**.

## Como Jogar

1. Clique em **Jogar** na tela inicial
2. O cursor ficará travado na tela (**Pointer Lock**)
3. **WASD** — movimentar pela sala
4. **Mouse** — olhar ao redor
5. **Clique esquerdo** — atirar nos alvos
6. Tente acertar o máximo em **30 segundos**!

## Controles

| Tecla | Ação |
|---|---|
| W / ↑ | Andar para frente |
| S / ↓ | Andar para trás |
| A / ← | Strafe esquerda |
| D / → | Strafe direita |
| Mouse | Mira / olhar |
| Clique | Atirar |
| ESC | Liberar cursor |

## Tecnologias

- **WebGL 1.0** — renderização 3D
- **GLSL** — shaders de vértice e fragmento
- **math.js** — álgebra linear (matrizes de câmera, perspectiva)
- **Pointer Lock API** — captura do mouse
- **Canvas 2D** — geração procedural de texturas

## Equipe

- Pedro Ulisses Pereira Castro Maia - N° de Matrícula 1607926
- Victor Araújo Silva - N° de Matrícula 1752870

## Links

- [**Vídeo demonstração**](https://youtu.be/Pdo06Z1VZWk)
- [**Slides:**](https://canva.link/4k0d306iesw4zrv)
