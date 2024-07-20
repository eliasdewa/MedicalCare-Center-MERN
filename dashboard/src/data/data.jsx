import {
	MdOutlinePersonAddAlt,
	MdOutlineSpaceDashboard,
} from 'react-icons/md';
import { BsPersonFillAdd } from 'react-icons/bs';
import { TiMessages } from 'react-icons/ti';
import { FaUserDoctor, FaUsers } from 'react-icons/fa6';

// department
export const departments = [
	{
		id: 1,
		image: 'department/Casualty.jpg',
		title: 'Casualty',
		description:
			'The casualty department is also known as the emergency department which deals with emergency conditions or provides immediate treatment. In this department, patients are assessed carefully and provided immediate treatment and care before being sent for further treatment in a specialized development.',
	},
	{
		id: 2,
		image: 'department/Cardiology.jpg',
		title: 'Cardiology',
		description:
			'The cardiology department deals with the human heart and circulation problems. It provides services on an inpatient and outpatient basis.In this department, a cardiologist prescribes some tests and some procedures are performed such as angioplasty, inserting a pacemaker, atherectomy, heart catheterization, stent implantation etc.',
	},
	{
		id: 3,
		image: 'department/Psychiatry.jpg',
		title: 'Psychiatry',
		description:
			'This department deals with the diagnosis, treatment and prevention of mental illness and disorders. Some of the services include: Investigation, diagnosis and treatment of psychiatric illness, Providing psychological counselling, De-addiction services, Conducting IQ tests.',
	},
	{
		id: 4,
		image: 'department/Gastroenterology.jpg',
		title: 'Gastroenterology',
		description:
			'This department deals with digestive system diseases and their management. In this department, gastroenterologists investigate, diagnose, treat and prevent all kinds of gastrointestinal problems such as peptic ulcer, gastritis, gallstones, indigestion, faecal incontinence, Hirschsprung disease etc. and perform various surgical procedures.',
	},
	{
		id: 5,
		image: 'department/Surgery.jpeg',
		title: 'General Surgery',
		description:
			'In this department perform various surgical procedures. Some of the common surgical procedures performed are thyroid surgery, colon surgery, gall bladder surgery, breast surgery etc.',
	},
	{
		id: 6,
		image: 'department/Gynaecology.jpg',
		title: 'Gynaecology',
		description:
			'The gynaecology department deals with investigation, treatment and prevention of female reproductive system and urinary tract problems. Some of the common problems which are investigated and treated are infertility, incontinence, endometritis etc.',
	},
	{
		id: 7,
		image: 'department/Paediatrics.jpg',
		title: 'Paediatrics',
		description:
			'The paediatrics department deals with infants, children and adolescents. This department deals with some significant diseases such as infectious diseases, congenital diseases, mental disorders and childhood cancer.',
	},
	{
		id: 8,
		image: 'department/Oncology.jpg',
		title: 'Oncology',
		description:
			'Oncology department deals with the investigation and treatment of cancers. In this department, cancer patients are treated with chemotherapy, radiotherapy and surgery..',
	},
];
// SidebarLinks
export const sidebarLinks = [
	{
		id: 1,
		title: 'Dashboard',
		to: '/',
		icon: <MdOutlineSpaceDashboard size={30} />,
	},
	{
		id: 2,
		title: 'All Messages',
		to: '/messages',
		icon: <TiMessages size={30} />,
	},
	{
		id: 3,
		title: 'All Patients',
		to: '/patients',
		icon: <FaUsers size={30} />,
	},
	{
		id: 4,
		title: 'All Doctors',
		to: '/doctors',
		icon: <FaUserDoctor size={30} />,
	},
	{
		id: 5,
		title: 'Add Doctor',
		to: '/doctor/register',
		icon: <BsPersonFillAdd size={30} />,
	},
	{
		id: 6,
		title: 'Add New Admin',
		to: '/admin/register',
		icon: <MdOutlinePersonAddAlt size={30} />,
	},
];
