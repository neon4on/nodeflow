# NodeFlow

NodeFlow — это библиотека для работы с потоками данных в Node.js, разработанная на TypeScript. Она позволяет легко манипулировать потоками через функции преобразования, фильтрации и объединения.

---

## Установка

Установите библиотеку через npm:

```bash
npm install nodeflow
```

## Быстрый старт

Пример создания потока, который удваивает входящие числа:

```ts
import { Stream } from "nodeflow";

// Создаём поток, который удваивает числа
const doubleStream = new Stream((data) => data * 2);

// Пишем данные в поток
doubleStream.write(1);
doubleStream.write(2);
doubleStream.write(3);
doubleStream.end();

// Подключаем вывод к консоли
const output = new Writable({
  objectMode: true,
  write(chunk, encoding, callback) {
    console.log(chunk);
    callback();
  },
});

doubleStream.pipe(output);
```

### Ожидаемый вывод:

```text
2
4
6
```

## API

### Класс Stream

Конструктор

```ts
new Stream(transformFn: (chunk: any) => any)
```

Создаёт новый поток с функцией преобразования transformFn.

### Методы

- pipe(destination: Transform | Writable): Подключает поток к указанному месту назначения.
- write(data: any): Записывает данные в поток.
- end(): Завершает поток.
- static fromArray(data: any[]): Создаёт поток из массива.


## Тестирование

Для запуска тестов используйте команду:

```bash
npm test
```

## Развитие и задачи

Если вы нашли баг или хотите предложить улучшение, создавайте задачи в разделе Issues.

## Авторы и благодарности

- Разработчик: [neon4on](https://github.com/neon4on)
- Поддержать EVM: 0xD6Afa8Dd648e622a980E4f3C85488Ac14aCF516C
- Поддержать SOL: 68MadJAG6JQBz24p1xHDU5BS4gt8YvyCeZxMHHakDXop
- Поддержать SUI: 0xd340aec6e7c807fdb937d682aeaf2c7ba8092899c6db15f86c82fe105ae1cc22

