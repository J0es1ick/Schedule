import * as readline from "readline";

export async function input(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, (answer) => {
        resolve(answer);
      });
    });
  };

  async function askForFaculty(): Promise<void> {
    const faculty: string = await question(
      "Выберите факультет из предложенных: 1. ИВТФ 2. ИФФ 3. ТЭФ 4. ФЭУ 5. ЭМФ 6. ЭЭФ: "
    );
    const facultyNumber: number = parseInt(faculty);
    if (isNaN(facultyNumber) || facultyNumber < 1 || facultyNumber > 6) {
      console.log("Некорректный ввод. Пожалуйста, попробуйте снова.");
    } else {
    }
  }
}
