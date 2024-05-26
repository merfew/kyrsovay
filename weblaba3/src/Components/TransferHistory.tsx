import axios from "axios";
import { useEffect, useState } from "react";

export function TransferHistory(){
    const [kyda, setKyda] = useState('');
    const [sum, setSum] = useState('');
    const [kyda1, setKyda1] = useState('');
    const [sum1, setSum1] = useState('');
    const [kyda2, setKyda2] = useState('');
    const [sum2, setSum2] = useState('');
    const [kyda3, setKyda3] = useState('');
    const [sum3, setSum3] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('https://localhost:7225/Home/ViewHistory', { headers: { id: 1 }, withCredentials: true });
              const data = response.data;
              console.log(data);
              // Проверьте, действительно ли data содержит элементы
              if (data.length > 0) {
                const info = data[0]; 
                setKyda(info.kyda);
                setSum(info.sum);
                console.log(info.kyda, info.sum);

                const inf = data[1]; 
                setKyda1(inf.kyda);
                setSum1(inf.sum);
                console.log(inf.kyda, inf.sum);

                const infor = data[2]; 
                setKyda2(infor.kyda);
                setSum2(infor.sum);
                console.log(infor.kyda, infor.sum);

                const inform = data[3]; 
                setKyda3(inform.kyda);
                setSum3(inform.sum);
                console.log(inform.kyda, inform.sum);

              } else {
                // Обработка случая, когда data пустой или не содержит ожидаемые данные
                console.log('Полученные данные пусты или не соответствуют ожидаемому формату');
              }
            } catch (error) {
              console.error(error);
            }
          };
          
    fetchData();
  }, []);

    return(
      <div>
{sum3 ? (
  <div style={{display: 'flex', marginLeft:'30px'}}> 
    <img style={{width:'50px', height:'50px'}} src="https://userscontent2.emaze.com/images/6da9f7b6-1df7-4045-8de5-079b0c0971c5/fb4b1bc718af40898b9df26d51c9de9f.jpg"/> 
    <div style={{color:'pink', marginLeft:'30px', fontSize: '30px'}}> 
      Перевод на {kyda3} {sum3} рублей 
    </div> 
  </div>
) : null}

      {sum2 ? (
  <div style={{display: 'flex', marginLeft:'30px'}}> 
    <img style={{width:'50px', height:'50px'}} src="https://userscontent2.emaze.com/images/6da9f7b6-1df7-4045-8de5-079b0c0971c5/fb4b1bc718af40898b9df26d51c9de9f.jpg"/> 
    <div style={{color:'pink', marginLeft:'30px', fontSize: '30px'}}> 
      Перевод на {kyda2} {sum2} рублей 
    </div> 
  </div>
) : null}


{sum1 ? (
  <div style={{display: 'flex', marginLeft:'30px'}}> 
    <img style={{width:'50px', height:'50px'}} src="https://userscontent2.emaze.com/images/6da9f7b6-1df7-4045-8de5-079b0c0971c5/fb4b1bc718af40898b9df26d51c9de9f.jpg"/> 
    <div style={{color:'pink', marginLeft:'30px', fontSize: '30px'}}> 
      Перевод на {kyda1} {sum1} рублей 
    </div> 
  </div>
) : null}



{sum ? (
  <div style={{display: 'flex', marginLeft:'30px'}}> 
    <img style={{width:'50px', height:'50px'}} src="https://userscontent2.emaze.com/images/6da9f7b6-1df7-4045-8de5-079b0c0971c5/fb4b1bc718af40898b9df26d51c9de9f.jpg"/> 
    <div style={{color:'pink', marginLeft:'30px', fontSize: '30px'}}> 
      Перевод на {kyda} {sum} рублей 
    </div> 
  </div>
) : null}

</div>
      
    )
  }
export default TransferHistory;