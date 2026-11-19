import time
from dados import ERAS
from interface import exibir_boas_vindas, exibir_rodada, exibir_resultado_final


def obter_escolha(qtd_opcoes):
    opcoes_validas = [str(n) for n in range(1, qtd_opcoes + 1)]
    while True:
        escolha = input(f"Digite o número do figurino (1-{qtd_opcoes}): ").strip()
        if escolha in opcoes_validas:
            return int(escolha)
        print(f"⚠️  Opção inválida! Digite apenas de 1 a {qtd_opcoes}.")


def jogar():
    pontuacao = 0
    total_eras = len(ERAS)

    exibir_boas_vindas()

    for i, era in enumerate(ERAS, 1):
        exibir_rodada(i, total_eras, era)

        inicio = time.time()
        escolha = obter_escolha(len(era["opcoes"]))
        tempo_gasto = round(time.time() - inicio, 2)

        print(f"\n⏱️  Você levou {tempo_gasto} segundos!")

        if tempo_gasto > era["tempo"]:
            print(f"❌ ATRASOU! O elevador subiu antes da hora! (Limite: {era['tempo']}s)")
            print("A plateia percebeu o atraso no palco!")
        elif escolha == era["correta"]:
            print(f"✅ PERFEITO! A Taylor subiu no palco impecável para {era['nome']}!")
            pontuacao += 1
        else:
            correto_texto = era["opcoes"][era["correta"] - 1]
            print("❌ FIGURINO ERRADO! Essa roupa é de outra era!")
            print(f"👉 O certo seria: {correto_texto}")

        time.sleep(2.5)

    exibir_resultado_final(pontuacao, total_eras)


if __name__ == "__main__":
    jogar()