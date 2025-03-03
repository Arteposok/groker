import Groq from "npm:groq-sdk";
import { Spinner } from "@std/cli/unstable-spinner";

const groq = new Groq({ apiKey: "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" });

async function main() {
  while (true) {
    const question = prompt("prompt > ");
    const answer = await askGroq(question||"").then(
      data=>data.choices[0]?.message?.content || ""
    );
    console.log(`%c ${answer}`, `color: black; background-color:white`);
  }
}

async function askGroq(question:string) {
  const spinner=new Spinner({ message:"waiting for response...", color: "blue" });
  spinner.start();
  const result=await groq.chat.completions.create({
    messages: [
      {
        role:"system",
        content:"provide a conscise and informative answer"
      },
      {
        role: "user",
        content: question,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
  
  spinner.stop();
  return result
}
main();