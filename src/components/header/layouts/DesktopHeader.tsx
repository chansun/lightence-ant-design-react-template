import React from 'react';
import { NotificationsDropdown } from '../components/notificationsDropdown/NotificationsDropdown';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { HeaderSearch } from '../components/HeaderSearch/HeaderSearch';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';
import { HeaderFullscreen } from '../components/HeaderFullscreen/HeaderFullscreen';
import * as S from '../Header.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { malgunFont } from './malgun'

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

// const doc = new jsPDF()

// doc.addFileToVFS("malgun.ttf", font);
// doc.addFont("malgun.ttf", "malgun", "normal");
// doc.setFont("malgun");

// doc.text("안녕하세요 ^^", 10, 30);

var doc = new jsPDF("p", "mm", "a4");

doc.addFileToVFS('malgun.ttf', malgunFont); 
doc.addFont('malgun.ttf','malgun', 'normal');
doc.setFont('malgun'); 


export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isTwoColumnsLayout }) => {


  const exportHandler = () => {
    alert("export!")
    autoTable(doc, {
      styles : { font : 'malgun', fontStyle :'normal'},
      head: [['Name', 'Email', '안녕']],
      body: [
        ['David', 'david@example.com', 'Sweden'],
        ['안녕하세요', 'castille@example.com', 'ㅁㄴㅇㅁㄴㅇㅇ'],
      ],
    })
    
    doc.save("first_PDF.pdf"); // PDF 저장
    // doc clear,
  }

  const leftSide = isTwoColumnsLayout ? (
    <S.SearchColumn xl={16} xxl={17}>
      <BaseRow justify="space-between">
        <BaseCol xl={15} xxl={12}>
          {/* <HeaderSearch /> */}
        </BaseCol>
        <BaseCol>
          {/* <S.GHButton /> */}
        </BaseCol>
      </BaseRow>
    </S.SearchColumn>
  ) : (
    <>
      <BaseCol lg={10} xxl={8}>
        {/* <HeaderSearch /> */}
      </BaseCol>
      <BaseCol>
        {/* <S.GHButton /> */}
      </BaseCol>
    </>
  );

  return (
    <BaseRow justify="space-between" align="middle">
      {leftSide}

      <S.ProfileColumn xl={8} xxl={7} $isTwoColumnsLayout={isTwoColumnsLayout}>
        <BaseRow align="middle" justify="end" gutter={[5, 5]}>
          <BaseCol>
            <BaseRow gutter={[{ xxl: 5 }, { xxl: 5 }]}>
              <BaseCol>
                <div onClick={exportHandler}>export</div>
              </BaseCol>
              <BaseCol>
                <HeaderFullscreen />
              </BaseCol>

              {/* <BaseCol>
                <NotificationsDropdown />
              </BaseCol>

              <BaseCol>
                <SettingsDropdown />
              </BaseCol> */}
            </BaseRow>
          </BaseCol>

          <BaseCol>
            <ProfileDropdown />
          </BaseCol>
        </BaseRow>
      </S.ProfileColumn>
    </BaseRow>
  );
};
