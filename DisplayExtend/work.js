const menuData = 
{
  //level 0
    key: 'keyword',
    description: 'description0',
    itemType: 'nest' | 'select' | 'input-number' | 'input-alphabet' { | 'checkbox' | 'radio' }
    nest: [
        {
            key: 'keyword',
            description: 'description1',
            itemType: 'nest' | 'select' | 'input-number' | 'input-alphabet' { | 'checkbox' | 'radio' }
            nest: [
                {
                    key: 'keyword',
                    description: 'description1',
                    itemType: 'nest' | 'select' | 'input-number' | 'input-alphabet' { | 'checkbox' | 'radio' }
                },
                {
                    key: 'keyword',
                    description: 'description2',
                    itemType: 'nest' | 'select' | 'input-number' | 'input-alphabet' { | 'checkbox' | 'radio' }
                },
            ]
        },
        {
            key: 'keyword',
            description: 'description2',
            itemType: 'nest' | 'select' | 'input-number' | 'input-alphabet' { | 'checkbox' | 'radio' }
        },
    ]
}


Menu description0
    description1
    description2


