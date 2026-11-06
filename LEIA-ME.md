# ScriptEditor — Versão 1.0.0 (edição 95)

Ilha de edição não-linear de vídeo estilo Windows 95, projetada para trabalhar em conjunto com o **ScriptRoom**.

## Integração Direta com o ScriptRoom

- **Leitura e Monitoramento ao Vivo (`Documentos\ScriptRoom`)**: Ao abrir o **ScriptEditor**, ele localiza automaticamente a pasta `Documentos\ScriptRoom` e carrega seus roteiros (`.ROT` / `.json`), cenas, atos, personagens, falas, marcas sonoras (`[SFX]` / `TRILHA:`), cartelas (`CARTELA:`) e boletins de câmera.
- **Montagem Automática de 4 Faixas**: A linha do tempo não-linear é montada automaticamente seguindo o roteiro aberto:
  - **V2 — Cartelas / GC (Chyron 95)**: Letreiros e cartelas extraídos do roteiro ou criados na ilha.
  - **V1 — Vídeo / Cenas**: Planos de corte de cada cena do episódio (reproduz vídeos reais `.MP4`, `.AVI`, `.WEBM`, imagens `.BMP`/`.JPG` ou o **Storyboard 16mm Sintetizado** de época).
  - **A1 — Diálogos / Locução (ADR)**: Sincronizado com cada fala do roteiro, exibindo Closed Caption Linha 21 no monitor CRT 4:3 e destacando a fala na folha Courier 12pt em tempo real.
  - **A2 — Trilha e Sonoplastia (Sound Blaster 16)**: Dispara os efeitos sonoros e ambientes indicados no roteiro.
- **Gravação de Volta no ScriptRoom (`Ctrl+S`)**: Ajustou a duração de uma cena na timeline ou bateu um take na claquete? Clique em **Gravar no ScriptRoom** para atualizar a minutagem `[MM:SS–MM:SS]` e o boletim de câmera diretamente no seu roteiro do ScriptRoom.

## Como Executar ou Gerar o Instalador Windows 95

- **Abrir em modo de desenvolvimento**:
  ```bash
  npm start
  ```
- **Gerar o instalador clássico estilo Windows 95 (`dist\SETUP_SCRIPTEDITOR_1.0.0.exe`)**:
  ```bash
  npm run instalador
  ```

