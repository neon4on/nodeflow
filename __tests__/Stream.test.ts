import { Stream } from "../src/Stream";
import { Writable } from "stream";

describe("Stream", () => {
  it("should double numbers passed through the stream", (done) => {
    const doubleStream = new Stream((data) => data * 2);

    const results: number[] = [];
    const output = new Writable({
      objectMode: true,
      write(chunk, encoding, callback) {
        results.push(chunk);
        callback();
      },
    });

    output.on("finish", () => {
      expect(results).toEqual([2, 4, 6]);
      done();
    });

    doubleStream.pipe(output);
    doubleStream.write(1);
    doubleStream.write(2);
    doubleStream.write(3);
    doubleStream.end();
  });

  it("should handle errors gracefully", (done) => {
    const errorStream = new Stream(() => {
      throw new Error("Test Error");
    });

    const output = new Writable({
      objectMode: true,
      write(chunk, encoding, callback) {
        callback(new Error("Should not write"));
      },
    });

    errorStream.on("error", (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Test Error");
      done();
    });

    errorStream.pipe(output);
    errorStream.write(1);
    errorStream.end();
  });
});
