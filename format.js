import AsyncStorage from '@react-native-async-storage/async-storage';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var current = month + '-' + date + '-' + year;
  var cmonth = month + '-' + year;

  return { current, cmonth, month };
};

export const save = async (
  tsource,
  tamount,
  check,
  setSource,
  setAmount
) => {
  let count = [];

  try {
    let count = await AsyncStorage.getAllKeys();

    parseInt(count);

    if (tsource == null || tamount == null || tamount == '' || tsource == '') {
      alert('Please Fill Data');
    } else {
       const newTransaction = {
    source: tsource,
    amount: tamount,
    date: getCurrentDate().current,

  };
      await AsyncStorage.setItem(
        check.concat(count.length + 1),
        JSON.stringify(newTransaction)
      );
    }

    setSource('');
    setAmount('');
  } catch (err) {
    alert(err);
  }
};

export const del = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    alert(err);
  }
};

export const load = async (setStext, check, setExpense, setIncome) => {
  let keys = [];
  let source = [];
  let total = 0;

  try {
    await AsyncStorage.removeItem('EXPO_CONSTANTS_INSTALLATION_ID');
    
    let keys = await AsyncStorage.getAllKeys();

    if (keys.length > 0) {
      setStext(source);

      for (let i = 0; i < keys.length; i++) {
        if (keys[i].charAt(0) === check) {
          let user = await AsyncStorage.getItem(keys[i]);
          if (user === null) {
            break;
          } else {
            let parsed = JSON.parse(user);
            setStext((sourcetexts) => [
              ...sourcetexts,
              {
                id: keys[i],
                source: parsed.source,
                amount: parsed.amount,
                date: parsed.date,
              },
            ]);

            total += parseInt(parsed.amount);
          }
        }
      }
    }
    else
    {
      setStext(source);
    }

    setExpense(total);

    if (check === 'i') {
      if (total !== null) {
        await AsyncStorage.setItem('balance', total.toString());
      }
      let user = await AsyncStorage.getItem('balance');
      setIncome(parseInt(user));
    }
    if (check === 'f') {
      await AsyncStorage.setItem('totalexpense', total.toString());
      let user = await AsyncStorage.getItem('balance');
      setIncome(parseInt(user) - total);
    }
  } catch (err) {
    alert(err);
  }
};

export const update = async (setStext, setIncome) => {

  let msavings = 0
  let mexpense = 0 
  let texpense = 0

  let keys = await AsyncStorage.getAllKeys();

  texpense = await AsyncStorage.getItem('balance');

  mexpense = await AsyncStorage.getItem('totalexpense');
  
  msavings = parseInt(texpense) - parseInt(mexpense);

  
   const temp = {
     
    date: getCurrentDate().cmonth,
    monthexpense: mexpense,
    monthsavings: msavings
    
  };
    let updatestatus = await AsyncStorage.getItem('update');
    if (updatestatus === null)
    {
      await AsyncStorage.setItem('update','u'.concat(getCurrentDate().month).toString());
      mexpense = 0
      msavings = 0
      
    }
    
    
      if(updatestatus !== null && updatestatus.charAt(1) < getCurrentDate().month)
      {
        
        await AsyncStorage.setItem('s'.concat(keys.length+1),JSON.stringify(temp));
        await AsyncStorage.setItem('update','u'.concat(getCurrentDate().month+1).toString());   
       if (keys.length > 0) 
       {
          for (let i = 0; i < keys.length; i++) 
          {
            if (keys[i].charAt(0) === 'i' || keys[i].charAt(0) == 'f')  
            {
              alert(keys[i])
              AsyncStorage.removeItem(keys[i]);
              setStext([])
              setIncome(0)
            }
          }
       }
      }
      
};

export const summarylist = async (setStext) => {
  
  let keys = [];
  let source = [];

  try {
    let keys = await AsyncStorage.getAllKeys();

    if (keys.length > 0) {
      setStext(source);

      for (let i = 0; i < keys.length; i++) {
        if (keys[i].charAt(0) === 's') {
          let user = await AsyncStorage.getItem(keys[i]);

          console.log(user)

          let parsed = JSON.parse(user);

          setStext((sourcetexts) => [
            ...sourcetexts,
            {
              id: keys[i],
              date: parsed.date,
              monthexpense: parsed.monthexpense,
              monthsavings: parsed.monthsavings,
            },
          ]);
        }
      }
    }
  } catch (err) {
    alert(err);
  }
};

export const  letterhandle = (keyValue, setSource, inputtext, tsource) => {
        const regex = new RegExp("^[a-zA-Z]+$");
    
          if(!regex.test(keyValue))
          { 
            let count = keyValue.length
            inputtext.current.setNativeProps({ value: "" });
            if (tsource==null || count == 0)
            {
              setSource("")
            }
            
          }
          else
          {
              setSource(keyValue)
          }   
  };

export const  numberhandle = (keyValue, setAmount, inputnumber, tamount) => {
        const regex = new RegExp("^[0-9]+$");

        if(!regex.test(keyValue))
          { 
            let count = keyValue.length
            inputnumber.current.setNativeProps({ value: "" });
            if (tamount==null || count == 0)
            {
              setAmount("")
            }
            
          }
          else
          {
              setAmount(keyValue)
          }   
  };
   