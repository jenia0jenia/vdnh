# Инструкция для запуска без интернета

Распаковать, запустить локальный файловый сервер x86_64-windows-msvc-simple-http-server.exe (x86_64-linux-musl-simple-http-server для linux), предоставляя права для запуска. Оставить запущенным!

Открыть страницу локального сервера (localhost:8000 по умолчанию) -> файл index.html

## для android
Использовать локальный файловый сервер `Simple HTTP Server` https://play.google.com/store/apps/details?id=com.phlox.simpleserver&hl=ru&gl=US&pli=1 из `PlayMarket` 

# Инструкция для редактирования JSON файла
Файл редактирования викторин находится в папке `build/quiz/data.json` - сейчас в него входят только 4 викторины.

Файл со всеми викторинами - `build/quiz/data-long.json` - переименовать в `data.json` для использования

## Структура JSON
**В файле не должно быть комментариев!**

**Все файлы каринок должны находиться в папке `build/quiz/` !**


## тип вопроса "найти пару"
```
{
  "classic": { # любое название латиницей `обязательно`
    "name": "Тест по классике", # Имя викторины, `обязательно`
    "slug": "classic", # часть url, `обязательно`
    "type": "step-by-step", # тип викторины `test` (как викторина Любовь) с двумя вариантами ответа или `step-by-step` (как все остальные) `обязательно`
    "background_image": "love.png", # картинка-фон для викторины
    "color": "rgba(43, 113, 140, 0.7)", # цвет викторины на экране списка викторин
    "text_before": "Текст приветствия", # часть url, `обязательно`
    "questions": [ # список вопросов `обязательно`
      {
        "text": "Соедините авторов и их пап:", # Текст вопроса
        "type": "match", # тип вопроса `match` для вопроса `Найти пару` или `simple` для всех остальных `обязательно`
        "need_pairs": 3, # если нужно найти не все пары, например 3 пары
        "options": [ 
          {
            "text": "Саша Пушкин", # текст …
            "pair": "Сергей" # и пара ...
          },
          {
            "text": "Сергей",
            "pair": "Саша Пушкин"
          },
          {
            "text": "Саша Грибоедов",
            "pair": "Сергей"
          },
          {
            "text": "Сергей",
            "pair": "Саша Грибоедов"
          },
          {
            "text": "Серёжа Есенин",
            "pair": "Александр"
          },
          {
            "pair": "Серёжа Есенин",
            "text": "Александр"
          },
          {
            "text": "Боря Пастернак",
            "pair": "Леонид"
          },
          {
            "pair": "Боря Пастернак",
            "text": "Леонид"
          },
          {
            "text": "Федя Достоевский",
            "pair": "Михаил"
          },
          {
            "pair": "Федя Достоевский",
            "text": "Михаил"
          },
          {
            "text": "Лёша Горький", # если нужно найти не все пары
          },
          {
            "text": "Максим" # если нужно найти не все пары
          }
        ],
        "text_answer": "Папой Саши Пушкина был Сергей Львович Пушкин, он был военным, а в свободное время писал стихи и участвовал в любительских спектаклях. К сожалению, отношения Саши с папой не были дружескими. Своим наставником будущий поэт считал дядю — Василия Львовича, который тоже писал стихи и публиковал их.</br>" # Экран с объяснением правильного ответа
      },
    ]
  },
}
```


## тип вопроса "варианты ответа"
```
...
    "questions": [
      {
        "type": "simple",
        "text": "В XX&nbsp;веке набор <i>«рабочих инструментов»</i> писателя значительно отличался от современного. Михаил Зощенко для письма использовал перьевую ручку, которая состояла из двух частей: палочки и металлического наконечника, который вставлялся в неё. Как называли такие пишущие принадлежности в Санкт-Петербурге и Ленинграде XX&nbsp;века?",
        "options": [
          {
            "text": "Носик"
          },
          {
            "text": "Уточка"
          },
          {
            "text": "Вставочка",
            "correct": true # правильный ответ!
          },
          {
            "text": "Палочка"
          }
        ],
        "text_answer": "Вставочка - перьевая ручка с держателем и сменным пером. Отрывок из рассказа М.&nbsp;Зощенко <i>«Не надо врать»</i>: <i>«Я не слышал, что сказал учитель. Я не слышал потому, что мальчики, которые сидели позади, то шлепали меня книгой по затылку, то мазали мне ухо чернилами, то дергали меня за волосы, и когда я от неожиданности вскакивал — подкладывали под меня карандаш или вставочку.»</i>"
      }
    ]
...
```


## тип вопроса "тест"
```
...
    "questions": [
        {
            "text": "ВЕРИТЕ ЛИ ВЫ В ЛЮБОВЬ С ПЕРВОГО ВЗГЛЯДА?",
            "type": "test", 
            "options": [
            {
                "value": 0 
            },
            {
                "value": 1
            }
            ]
        }
    ],

    "result": [
      {
        "title": "ПИКНИК НА ОБОЧИНЕ",
        "subtitle": "Аркадий и Борис Стругацкие",
        "text": "<i>«И захотелось мне вдруг прямо сейчас же Гуту увидеть. Просто так. Посмотреть на нее, за руку подержать»</i>. <br>Вы не склонны публично проявлять свою любовь, но никогда не дадите повод усомниться в ваших искренних чувствах!",
        "image": "pickik.png",
      },
      ...
      {
        "title": "МАСТЕР И МАРГАРИТА",
        "subtitle": "Михаил Булгаков",
        "text": "<i>«Любовь выскочила перед нами, как из-под земли выскакивает убийца в переулке, и поразила нас сразу обоих!»</i> <br>Ради любимого человека вы готовы буквально на все! Взлететь в небеса и спуститься в ад? Легко! ",
        "image": "margarita.png",
      }
    ]
...
```