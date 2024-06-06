#Task 11 Moskow Hackathon

#Install Project:

1.  pip install -r backend/machine_learning/requirements.txt

2.  cd backend
    npm i

3.  cd billing-management
    npm i

#Run Project:

1.  cd backend
    node app.js

2.  cd billing-management
    npm run dev

#Postman managment:
POST http://localhost:5000/api/bills
Body raw
{
"id": 3,
"date": "2023-01-01T00:00:00.000Z",
"amount": 500,
"updatedAt": "2024-06-06T08:48:51.780Z",
"createdAt": "2024-06-06T08:48:51.780Z"
}
GET http://localhost:5000/api/bills
POST http://localhost:5000/api/distribute
GET http://localhost:5000/api/forecast

Desctiption:

1. Home.jsx
   Описание: Главная страница приложения. Здесь может быть размещена общая информация о приложении и его функциональности.

2. Bills.jsx
   Описание: Страница для отображения и управления счетами. Содержит компонент BillTable для отображения списка счетов.

3. Distribution.jsx
   Описание: Страница для запуска распределения счетов. Содержит кнопку для запуска распределения и отображает результаты распределения.

4. Forecast.jsx
   Описание: Страница для отображения прогнозируемых затрат. Содержит таблицу с прогнозами.

5. Create Bill
   Описание: Страница для создания счетов

6. DistributionObjects.jsx
   Описание: Страница для управления объектами распределения. Содержит форму для создания новых объектов и таблицу для отображения существующих объектов.
