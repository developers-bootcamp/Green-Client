import React ,{useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config';
import { theGenericGraph } from "../../../../apiCalls/graphCalls";
import moment from "moment";
import { NoDataGenericDiv } from "./Dashboard.style";

const colors = [PALLETE.GREEN, PALLETE.ORANGE, PALLETE.BLUE, PALLETE.RED, PALLETE.YELLOW]

const options = {
  // chart: {
  //   title: "Company Performance",
  //   subtitle: "Sales, Expenses, and Profit: 2014-2017",
  // },
  legend: {
    position: "none"
  },
  backgroundColor: PALLETE.GRAY,
};

interface props{
  collection:string | null,
  groupBy:string | null
}

const GenericGraph: React.FC<props> = ({collection, groupBy}) => {

  const [genericGraph, setGenericGraph] = useState(
    [
    {
      "count": 123,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 12345,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 145,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 125,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 165,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 12345,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 345,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 1234,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 123,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 12345,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 145,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 125,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 165,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 12345,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 345,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 1234,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 123,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 12345,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 145,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 125,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 165,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 12345,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
    {
      "count": 345,
      "field": {
        "id": "12345",
        "employee": {
          "id": "12345",
          "name": "John Doe"
        },
        "customer": {
          "id": "67890",
          "name": "Jane Doe"
        },
        "totalAmount": 100.00,
        "orderItemsList": [
          {
            "productId": 1234,
            "quantity": 1,
            "price": 10.00
          },
          {
            "productId": 67890,
            "quantity": 2,
            "price": 5.00
          }
        ],
        "orderStatus": "Pending",
        "company": {
          "id": "12345",
          "name": "Acme Corporation"
        },
        "creditCardNumber": "1234-5678-9012-3456",
        "expiryOn": "2023-12-31",
        "cvc": "123",
        "notificationFlag": true,
        "auditData": {
          "createdBy": "John Doe",
          "createdOn": "2023-03-03T10:46:53.000Z",
          "lastModifiedBy": "John Doe",
          "lastModifiedOn": "2023-03-03T10:46:53.000Z"
        }
      }
    },
  ]
  )

  // useEffect(() => {
  //   theGenericGraph(props.collection, props.groupBy).then(res => {
  //       setGenericGraph(res.data)
  //     }).catch(err => {
  //       console.error(err)
  //     })
  //   }, []);

  let MyGenericGraphData:any[];

  switch (groupBy) {
    case "month-year":
      MyGenericGraphData = genericGraph.map((element, index) => [
        moment(element.field.auditData.createdOn).format("MM/YY"),
        element.count,
        colors[index % 5],
      ]);
      break;
    case "employee":
      MyGenericGraphData = genericGraph.map((element, index) => [
        element.field.employee.name,
        element.count,
        colors[index % 5],
      ]);
      break;
    case "customer":
      MyGenericGraphData = genericGraph.map((element, index) => [
        element.field.customer.name,
        element.count,
        colors[index % 5],
      ]);
      break;
    // case "id":
    //   MyGenericGraphData = genericGraph.map((element, index) => [
    //     element.field.name,
    //     element.count,
    //     colors[index % 5],
    //   ]);
    //   break;
    // case "category":
    //   MyGenericGraphData = genericGraph.map((element, index) => [
    //     element.field.category,
    //     element.count,
    //     colors[index % 5],
    //   ]);
    //   break;
    // default:
    //   MyGenericGraphData = genericGraph.map((element, index) => [
    //     element.field.role,
    //     element.count,
    //     colors[index % 5],
    //   ]);
    //   break;
    default:
      MyGenericGraphData = []
  }

  const data = [
    ["field", "count", { role: "style" }],
    ...MyGenericGraphData
  ];
  

  return (
    MyGenericGraphData.length > 0 ?
        <Chart 
        chartType="ColumnChart" 
        width="100%" 
        height="500px" 
        data={data}
        options={options}
        />
        :<NoDataGenericDiv>No data</NoDataGenericDiv>
  );
}
export default GenericGraph