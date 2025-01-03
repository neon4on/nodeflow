import { Transform } from "stream";
import { EventEmitter } from "events";

export class Stream extends EventEmitter {
  private stream: Transform;

  constructor(transformFn: (chunk: any) => any) {
    super();
    this.stream = new Transform({
      objectMode: true,
      transform: (chunk, encoding, callback) => {
        try {
          const result = transformFn(chunk);
          callback(null, result);
        } catch (error) {
          this.emit("error", error);
          callback(error instanceof Error ? error : new Error(String(error)));
        }
      },
    });

    this.stream.on("error", (err) => this.emit("error", err));
  }

  pipe(destination: Transform | NodeJS.WritableStream) {
    return this.stream.pipe(destination);
  }

  write(data: any) {
    this.stream.write(data);
  }

  end() {
    this.stream.end();
  }

  static fromArray(data: any[]) {
    const stream = new Stream((chunk) => chunk);
    data.forEach((item) => stream.write(item));
    stream.end();
    return stream;
  }
}
