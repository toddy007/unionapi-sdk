## Links Importantes
[Documentação da API](https://kauazs.github.io/union_api_docs/redoc-static)<br>
[Repositório](https://github.com/toddy007/unionapi-sdk)<br>
[Bugs](https://github.com/toddy007/unionapi-sdk/issues)<br>
[NPMJS](https://www.npmjs.com/package/unionapi-sdk)
# Como Usar?
```js
import UnionAPI from 'unionapi-sdk';

const unionapi = new UnionAPI('A API KEY DO SEU BOT');
```
# Funções
### [getBotData](https://kauazs.github.io/union_api_docs/redoc-static#tag/BotList/paths/~1api~1botlist~1data/get)
> Retorna informações do bot ligado à API key.
```js
const botData = await unionapi.getBotData();
botData.prefix; // !
```
### [checkVote](https://kauazs.github.io/union_api_docs/redoc-static#tag/BotList/paths/~1api~1botlist~1check_vote/get)
> Verifica se um usuário determinado votou no bot ligado à API key, dentro de um determinado tempo.
- **Parâmetros**:
  - **userId**: string do id de um usuário do Discord, mínimo de **17** caracteres.
  - **maxTime** ( **OPCIONAL** : valor padrão = **30** ): um número maior que **1**.
```js
const voteChecked = await unionapi.checkVote('1315730837152731239', 60);
```
