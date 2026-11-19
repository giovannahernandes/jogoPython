import os


def limpar_tela():
    os.system("cls" if os.name == "nt" else "clear")


def exibir_boas_vindas():
    limpar_tela()
    print("=" * 60)
    print("✨ BEM-VINDO AO BACKSTAGE DA THE ERAS TOUR! ✨")
    print("=" * 60)
    print("Você é o estilista chefe da turnê. A Taylor tem poucos")
    print("segundos debaixo do palco para trocar de roupa entre as eras.")
    print("Escolha o figurino CERTO antes que o elevador suba!\n")
    input("Pressione ENTER para começar o show...")


def exibir_rodada(numero_ato, total_eras, era):
    limpar_tela()
    print("-" * 60)
    print(f"🎤 ATO {numero_ato}/{total_eras}: ERA {era['nome'].upper()}")
    print(f"⏱️  TEMPO LIMITE PARA TROCA: {era['tempo']} segundos!")
    print("-" * 60)
    print("A plataforma desceu! Rápido, escolha o figurino correto:\n")

    for idx, opcao in enumerate(era["opcoes"], 1):
        print(f"  [{idx}] {opcao}")
    print()


def exibir_resultado_final(pontuacao, total_eras):
    limpar_tela()
    print("=" * 60)
    print("🎆 FIM DO SHOW! VOCÊ SOBREVIVEU À THE ERAS TOUR! 🎆")
    print("=" * 60)
    print(f"Sua pontuação final: {pontuacao} de {total_eras} trocas perfeitas.\n")

    if pontuacao == total_eras:
        print("🏆 INCRÍVEL! Você é oficialmente o estilista chefe da Taylor Swift!")
    elif pontuacao >= 6:
        print("👏 MUITO BOM! O show foi um sucesso, mesmo com alguns sustos nos bastidores.")
    else:
        print("😅 QUASE LÁ! A Taylor teve que improvisar no palco hoje. Tente novamente!")