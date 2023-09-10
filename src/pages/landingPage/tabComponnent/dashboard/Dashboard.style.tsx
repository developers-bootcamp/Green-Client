import { styled } from '@mui/system';
import { PALLETE } from '../../../../config/config';

export const MyDiv = styled('div')({
    fontSize: 20,
    paddingTop: 130,
});

export const Item = styled('div')({
    backgroundColor: PALLETE.GRAY,
    padding: "1rem",
    borderRadius: 15,
    height: "35vh",
  });

export const DashboardGeneratorItem = styled('div')({
    backgroundColor: PALLETE.GRAY,
    padding: "5rem",
})

export const AutocompleteDiv = styled('div')({
    display: 'flex',
    justifyContent: 'center'
})

export const AutocompleteItem = styled('div')({
    padding:25,
})

export const NoDataGenericDiv = styled('div')({
    fontSize: 20,
    display: 'flex',
    justifyContent:'center',
    paddingTop: '20%',
})
