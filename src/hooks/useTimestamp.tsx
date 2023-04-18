//dfns
import { format, formatDistance } from 'date-fns';

const useTimestamp = ()=>{

    const handleTimestamp = (date: any, completeDate:boolean): string => {
        if(!completeDate){
          return formatDistance(new Date(date.toDate()), new Date(), {
            addSuffix: true,
          });
        } else {
          return format(date.toDate(), 'dd/MM/yyyy')
        }
      };

    return {handleTimestamp}
}

export default useTimestamp