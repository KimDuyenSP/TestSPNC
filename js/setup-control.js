const setupControl = (game) => {
    const control = document.querySelector("#control");
    const inputValues = document.querySelector("#control-input");
    const inputValue = document.querySelector("#control-input-2");
    const button = control.querySelector("button");
  
    const checking = (array, size) => {
      let flag = 0;
      for (let i = 0; i < size - 1; ++i) {
        for (let j = i + 1; j < size; ++j) {
          if (array[i] == array[j]) {
            flag = 1;
            break;
          }
        }
      }
      return flag;
    };
  
    const getInputValues = () => {
      if (!inputValues.value.trim()) throw new Error("Please fill in numbers");
      const values = inputValues.value
        .split(",")
        .map((value) => Number(value.trim()));
  
      console.log(values);
      if (values.some((value) => isNaN(value)))
        throw new Error("Invalid numbers");
  
      if (values.some((value) => value < 1 || value > 100))
        throw new Error("Min is 1, max is 100");
  
      console.log(values);
  
      if (checking(values, values.length) == 1)
        throw new Error("Number is duplicated!");
  
      return values;
    };
  
    const getInputValue = () => {
      if (!inputValue.value.trim()) throw new Error("Please fill in value");
      const value = Number(inputValue.value.trim());
      if (isNaN(value)) throw new Error("Invalid value");
  
      return value;
    };
  
    const start = () => {
      try {
        const values = getInputValues();
        const value = getInputValue();
  
        game.events.emit("start", { values, value });
      } catch (err) {
        alert(err.message);
      }
    };
  
    button.addEventListener("click", start);
  };
  