export default function prettyLog(label?: string, message?: string) {
  console.log("================PRETTY LOG================");
  console.log(label, JSON.stringify(message, null, 2));
}
