/*function listen(ms: number, run: () => void): Promise<string> {
  return new Promise(() => {
    const interval = setInterval(() => run(), ms);
    return () => clearInterval(interval);
  });
}
listen(1000, () => {
  console.log("Test");
}).catch(console.log);
*/
