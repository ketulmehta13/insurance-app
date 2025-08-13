import React from "react"
const Charts = () => {
    const chartData = [
      {
        title: "Client Registration",
        total: 200,
        used: 100,
        color: "bg-blue-500",
      },
      {
        title: "Policy Entry",
        total: 400,
        used: 200,
        color: "bg-green-500",
      },
      {
        title: "Documents Upload",
        total: 500,
        used: 300,
        color: "bg-purple-500",
      },
    ]
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {chartData.map((chart, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{chart.title}</h3>
              <button className="text-gray-400 hover:text-gray-600">⋮</button>
            </div>
  
            <div className="relative h-32 mb-4">
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="flex items-end space-x-2">
                  <div
                    className={`${chart.color} rounded-t`}
                    style={{
                      width: "40px",
                      height: `${(chart.used / chart.total) * 100}%`,
                      minHeight: "20px",
                    }}
                  ></div>
                  <div
                    className="bg-gray-300 rounded-t"
                    style={{
                      width: "40px",
                      height: `${((chart.total - chart.used) / chart.total) * 100}%`,
                      minHeight: "10px",
                    }}
                  ></div>
                </div>
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <span className="text-2xl font-bold text-gray-900">{chart.used}</span>
              </div>
            </div>
  
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 ${chart.color} rounded-full`}></div>
                <span className="text-gray-600">Total</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-gray-600">Used</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  export default Charts
  