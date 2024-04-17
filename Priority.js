function PriorityNPrem(Processes){
    Processes.sort((a, b) => a.arrival - b.arrival);
    const Gantt_Chart=document.getElementById("Gantt_Chart");
    const Gantt_Chart1=document.getElementById("Gantt_Chart1");
    Gantt_Chart.textContent="";
    Gantt_Chart1.textContent="";
    var currtime=0,index=0,avgTAT=0,avgWT=0;
    var queue=[];
    while(queue.length>0 || index<Processes.length)
    {
        while(index<Processes.length && currtime>=Processes[index].arrival)
        {
            queue.push(Processes[index]);
            index++;
        }
        // console.log(queue.length);
        if(queue.length==0)
        {
            var li1=document.createElement('li');
            var li2=document.createElement('li');
            li1.textContent="NO";
            li1.style.backgroundColor='red';
            //console.log(li1);
            Gantt_Chart.appendChild(li1);
            currtime=Processes[index].arrival;
            li2.textContent=currtime;
            li2.style.backgroundColor='red';
            Gantt_Chart1.appendChild(li2);
        }
        else
        {
            var li=document.createElement('li');
            var li1=document.createElement('li');
            queue.sort((a, b) => a.priority - b.priority);
            var process=queue.shift();
            //console.log(process.name);
            li.textContent=process.name;
            li.style.backgroundColor='blue';
            Gantt_Chart.appendChild(li);
            currtime+=process.burst;
            li1.textContent=currtime;
            li1.style.backgroundColor='blue';
            Gantt_Chart1.appendChild(li1);
            // console.log(process.burst);
            // console.log("currtime: " + currtime);
            //console.log(queue.length);
            var FT=currtime;
            var TAT=FT-process.arrival;
            avgTAT+=TAT;
            var WT=TAT-process.fburst;
            avgWT+=WT;
            addProcessToTable(process.priority,process.name,process.arrival,process.fburst,FT,TAT,WT);
        }
    }
    if(Processes.length>0)
    {
        avgTAT/=Processes.length;
        avgWT/=Processes.length;
        addProcessToTable("","","","","",`AvgTAT = ${avgTAT}`,`AvgWT = ${avgWT}`);
    }
}

function PriorityPrem(Processes){
    Processes.sort((a, b) => a.arrival - b.arrival);
    const Gantt_Chart=document.getElementById("Gantt_Chart");
    const Gantt_Chart1=document.getElementById("Gantt_Chart1");
    Gantt_Chart.textContent="";
    Gantt_Chart1.textContent="";
    var currtime=0,index=0,avgTAT=0,avgWT=0;
    var queue=[];
    while(queue.length>0 || index<Processes.length)
    {
        if(index<Processes.length && currtime>=Processes[index].arrival)
        {
            queue.push(Processes[index]);
            index++;
        }
        if(queue.length==0)
        {
            var li1=document.createElement('li');
            var li2=document.createElement('li');
            li1.textContent="NO";
            li1.style.backgroundColor='red';
            //console.log(li1);
            Gantt_Chart.appendChild(li1);
            currtime=Processes[index].arrival;
            li2.textContent=currtime;
            li2.style.backgroundColor='red';
            Gantt_Chart1.appendChild(li2);
        }
        else
        {
            var li=document.createElement('li');
            var li1=document.createElement('li');
            queue.sort((a, b) => a.priority - b.priority);
            var process=queue.shift();
            //console.log(process.name);
            li.textContent=process.name;
            li.style.backgroundColor='blue';
            Gantt_Chart.appendChild(li);
            var tempcurrtime=currtime;
            if(index<Processes.length)
            {
                currtime=Math.min(currtime+process.burst,Processes[index].arrival);
            }
            else
            {
                currtime+=process.burst;
            }
            li1.textContent=currtime;
            li1.style.backgroundColor='blue';
            Gantt_Chart1.appendChild(li1);
            // process.arrival=currtime;
            process.burst-=(currtime-tempcurrtime);
            // console.log(currtime);
            // console.log(process);
            if(index<Processes.length && currtime>=Processes[index].arrival)
            {
                queue.push(Processes[index]);
                index++;
            }
            if(process.burst>0)
            {
                queue.push(process);
            }
            else
            {
                var FT=currtime;
                var TAT=FT-process.arrival;
                avgTAT+=TAT;
                var WT=TAT-process.fburst;
                avgWT+=WT;
                addProcessToTable(process.priority,process.name,process.arrival,process.fburst,FT,TAT,WT);
            }
            // console.log(process.burst);
            // console.log("currtime: " + currtime);
            //console.log(queue.length);
        }
    }
    if(Processes.length>0)
    {
        avgTAT/=Processes.length;
        avgWT/=Processes.length;
        addProcessToTable("","","","","",`AvgTAT = ${avgTAT}`,`AvgWT = ${avgWT}`);
    }
}
