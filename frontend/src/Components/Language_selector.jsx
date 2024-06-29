import React from 'react';
import { Box, Button, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { LANGUAGE_VER } from './Constants.js';

const languages = Object.entries(LANGUAGE_VER);

const LangSelector = ({ language, onSelect }) => {
    return (
        <Box>
            <Text mb={2} fontSize='lg' fontWeight='bold'>Select Language:</Text>
            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    borderRadius="md"
                    _hover={{ bg: 'blue.100' }}
                >
                    {language}
                </MenuButton>
                <MenuList zIndex={50}>
                    {languages.map(([lang, version]) => (
                        <MenuItem key={lang} onClick={() => onSelect(lang)}>
                            <Text fontWeight='bold'>{lang}</Text>
                            <Text fontSize='sm' color='gray.500'>{version}</Text>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
};

export default LangSelector;
