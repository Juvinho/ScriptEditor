; Visual de instalador de 1995: tela inteira com degradê azul clássico atrás do assistente.
!macro customHeader
  BGFont "Times New Roman" 40 700
  BGGradient 0000A0 000010 FFFFFF
  BrandingText "ScriptEditor 95 · Instalação"
!macroend

!macro customWelcomePage
  !define MUI_WELCOMEPAGE_TITLE "Bem-vindo ao Programa de Instalação do ScriptEditor"
  !define MUI_WELCOMEPAGE_TEXT "Este programa vai instalar o ScriptEditor (edição 95) no seu computador.$\r$\n$\r$\nO ScriptEditor conecta-se automaticamente à sua pasta Documentos\ScriptRoom para carregar seus roteiros (.ROT), cenas, falas e boletins de câmera na ilha de edição.$\r$\n$\r$\nSeus projetos de montagem ficam guardados em Documentos\ScriptEditor e não são apagados se você desinstalar.$\r$\n$\r$\nRecomendamos fechar os outros programas antes de continuar. Clique em Avançar para continuar."
  !insertmacro MUI_PAGE_WELCOME
!macroend

