let data = [
    {
      "id": "10000",
      "name": "公安卷宗目录11",
      "pId": null,
      "sort": 1,
      "level": 1,
      "type": 0,
      'childAmount': 1,
      'openFlag': true,
      "childs": [
        {
        "id": "1",
        "name": "诉讼文书卷",
        "pId": "10000",
        "sort": 1,
        "level": 2,
        "type": 0,
        'openFlag': true,
        "childs": [
                {
                    "id": "1",
                    "name": "诉讼文书卷",
                    "pId": "10000",
                    "sort": 1,
                    "level": 3,
                    "type": 0,
                    'openFlag': true,
                    "childs": [ {
                        "id": "fm0021",
                        "name": "卷宗封面4",
                        "pId": "1",
                        "sort": 1,
                        "level": 4,
                        "type": 0,
                        "childs": [],
                        "imageCount": 0,
                        "evidenceCount": 0,
                        "canEdit": 0,
                        "sortName": null,
                        "sortTime": 0,
                        "isNew": 0,
                        "separateCode": "1",
                        "separateName": null,
                        "separateSort": 1,
                        'openFlag': true,
                        "parent": true
                    }],
                }
            ]
        }
    ]
           
    },
    {
        "id": "10001",
        "name": "公安卷宗目录",
        "pId": null,
        "sort": 1,
        "level": 1,
        "type": 0,
        'childAmount': 1,
        'openFlag': true,
        "childs": [
              {
              "id": "1",
              "name": "诉讼文书卷",
              "pId": "10000",
              "sort": 1,
              "level": 2,
              "type": 0,
              'openFlag': true,
              "childs": [
                      {
                          "id": "fm0011",
                          "name": "卷宗封面3",
                          "pId": "1",
                          "sort": 1,
                          "level": 3,
                          "type": 0,
                          "childs": [],
                          "imageCount": 0,
                          "evidenceCount": 0,
                          "canEdit": 0,
                          "sortName": null,
                          "sortTime": 0,
                          "isNew": 0,
                          "separateCode": "1",
                          "separateName": null,
                          "separateSort": 1,
                          'openFlag': true,
                          "parent": true
                      },
                      {
                          "id": "fm0021",
                          "name": "卷宗封面4",
                          "pId": "1",
                          "sort": 1,
                          "level": 3,
                          "type": 0,
                          "childs": [
                              {
                                "id": "fm0011",
                                "name": "卷宗封面3",
                                "pId": "1",
                                "sort": 1,
                                "level": 3,
                                "type": 0,
                                "childs": [],
                                "imageCount": 0,
                                "evidenceCount": 0,
                                "canEdit": 0,
                                "sortName": null,
                                "sortTime": 0,
                                "isNew": 0,
                                "separateCode": "1",
                                "separateName": null,
                                "separateSort": 1,
                                'openFlag': true,
                                "parent": true
                              }
                          ],
                          "imageCount": 0,
                          "evidenceCount": 0,
                          "canEdit": 0,
                          "sortName": null,
                          "sortTime": 0,
                          "isNew": 0,
                          "separateCode": "1",
                          "separateName": null,
                          "separateSort": 1,
                          'openFlag': true,
                          "parent": true
                      }
                  ]
              }
          ]
      }
]
export default data       