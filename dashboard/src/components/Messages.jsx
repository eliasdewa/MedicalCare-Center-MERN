import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
		<div className='md:ml-64 md:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-2'>
			<div className='bg-white rounded-lg p-4 shadow-md my-4'>
				<h1 className='text-center text-4xl font-bold pb-6'>All Messages</h1>
				<div className='flex flex-col'>
					<div className='overflow-x-auto'>
						<div className='p-1.5 w-full inline-block align-middle'>
							<div className='overflow-hidden border rounded-lg'>
								<table className='min-w-full divide-y divide-gray-200'>
									<thead className='bg-gray-50'>
										<tr>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Full Name
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase '
											>
												Email
											</th>
											<th
												scope='col'
												className='w-1/4 px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase'
											>
												Message
											</th>
											<th
												scope='col'
												className='w-1/4 px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase'
											>
												Delete
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200'>
										{messages && messages.length > 0 ? (
											messages.map((msg) => (
												<tr key={msg._id}>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{`${msg.firstName} ${msg.lastName}`}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap'>
														{msg.email}
													</td>
													<td className='px-6 py-4 text-sm text-gray-800 whitespace-wrap'>
														{msg.message}
													</td>
													<td className='px-6 py-4 text-sm font-medium text-center whitespace-nowrap'>
														<a
															className='text-red-500 hover:text-red-700'
															href='#'
														>
															Delete
														</a>
													</td>
												</tr>
											))
										) : (
											<td
												className='px-6 py-4 whitespace-nowrap text-3xl font-bold text-center'
											>
												No Message Yet!
											</td>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
