import { styled } from '@mui/system';
import { PALLETE } from '../../../../config/config';

export const MyDiv = styled('div')({
    fontSize: 20,
    paddingTop: 130,
});

export const Item = styled('div')({
    backgroundColor: PALLETE.GRAY,
    padding: 5,
    borderRadius: 15,
    height: 300,
  });

export const DashboardGeneratorItem = styled('div')({
    backgroundColor: PALLETE.GRAY,
    padding: 30,
    height: "75vh",
})

export const AutocompleteDiv = styled('div')({
    display: 'flex',
})

export const AutocompleteItem = styled('div')({
    padding:25,
})

export const NoDataGenericDiv = styled('div')({
    fontSize: 20,
    display: 'flex',
    justifyContent:'center',
    paddingTop: '50%',
})
