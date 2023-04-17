import './index.scss'
import Bar from "@/components/Bar";


function Home() {
    return (
        <div>
            <Bar
                title='主流框架满意度'
                xData={['react', 'vue', 'angular']}
                yData={[30, 50, 10]}
                style={{width: '500px', height: '400px'}}
            ></Bar>
            <Bar
                title='主流框架满意度2'
                xData={['react', 'vue', 'angular']}
                yData={[20, 30, 15]}
                style={{width: '300px', height: '300px'}}
            ></Bar>
        </div>
    )
}

export default Home