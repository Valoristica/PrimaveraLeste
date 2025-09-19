###############################################################							                                 
# TRATAMENTO ESTATÍSTICO
##############################################################

install.packages('readxl')# Leitura de arquivos do Excel
install.packages('lmtest') #testes RESET, Goldfeld-Quandt, Breusch-Pagan e Koenker 
library(readxl) # leitura de arquivos xls | Carregar o pacote desejado
library(lmtest) 

getwd() 
setwd("E:/LUTEMBERG/PROFISSIONAL/EMPRESA - VALORISTICA/CONSULTORIA/PROTÁSIO")
dir() 

dados <- read_excel("pesquisa de mercado(VF).xlsx", sheet=2)
View(dados)

attach(dados)
summary(dados) 


###  AJUSTE DO MODELO  ###

# MODELO 1 #

modelo1<-lm(log(PU)~AR+log(LOC))
summary(modelo1)
par(mfrow = c(2, 2)) 
plot(modelo1)
## Teste de SAHPIRO-WILK (NORMALIDADE)
residuos_padronizados <- rstandard(modelo1)
shapiro.test(residuos_padronizados)

## Teste de BREUSCH-PAGAN (HOMOCEDASTICIDADE)
bptest(modelo1, studentize=TRUE) 
# Valor-p >10%; portanto n?o rejeita Ho (hip?tese de homocedasticidade dos res?duos)

