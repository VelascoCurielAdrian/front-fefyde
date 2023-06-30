import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Component = styled('div')(({ theme }) => ({
	position: 'relative',
	color: '#263238',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: '#E9EEFA',
	'&:hover': {
		backgroundColor: '#E9EEFA',
	},
	margin: 6,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

export const SearchIcon = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	borderWidth: 1,
	borderRadius: 10,
	'& .MuiInputBase-input': {
		padding: theme.spacing(1.2, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));
