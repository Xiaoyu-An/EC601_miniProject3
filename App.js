import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native'
import moment from 'moment'

const width = Dimensions.get('window').width
const now = new Date()
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nowDate: new Date()
    }
  }

  _onPressButton(nowDate) {
    this.setState({
      nowDate
    })
  }

  render() {
    let { nowDate } = this.state
    let content = []
    for (let i = 0; i < this.props.monthNum; i++) { // month again
      let date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      let week = date.getDay(); // which day to start this month
      let days = new Date(now.getFullYear(), now.getMonth() + i + 1, 0).getDate();  // days of this month
      let dayList = [];
      for (let y = 0; y < week; y++) { // fill the blank
        dayList.push(
          <View style={styles.day}>
            <Text style={styles.dayText}></Text>
          </View>
        )
      }

      for (let x = 1; x <= days; x++) { // cycle the day
        let toDay = new Date(now.getFullYear(), now.getMonth() + i, x); // today
        let g = this.props.goliday[moment(toDay).format('YYYY-MM-DD')];
        if (!g) { // holiday
          g = x;
        }
        let node = <View style={styles.day}><TouchableOpacity onPress={this._onPressButton.bind(this, toDay)} activeOpacity={0.5}><Text style={[styles.dayText, { color: '#000' }]}>{g}</Text></TouchableOpacity></View>
        if (i == 0 && x < now.getDate()) { // the day before today are not display
          if ((week + x) % 7 == 1 || (week + x) % 7 == 0) { // sunday is blue
            node = <View style={styles.day}><Text style={[styles.dayText, { color: '#105eae' }]}>{g}</Text></View>
          } else {
            node = <View style={styles.day}><Text style={[styles.dayText, { color: '#999' }]}>{g}</Text></View>
          }
        } else if (i == 0 && x == now.getDate()) { // today
          node = <View style={styles.day}><TouchableOpacity onPress={this._onPressButton.bind(this, toDay)} activeOpacity={0.5}><Text style={[styles.dayText, { color: '#000' }]}>Today</Text></TouchableOpacity></View>
        } else if ((week + x) % 7 == 1 || (week + x) % 7 == 0) { // sunday is blue
          node = <View style={styles.day}><TouchableOpacity onPress={this._onPressButton.bind(this, toDay)} activeOpacity={0.5}><Text style={[styles.dayText, { color: '#105eae' }]}>{g}</Text></TouchableOpacity></View>
        }
        if (moment(toDay).format('YYYY-MM-DD') === moment(nowDate).format('YYYY-MM-DD')) { // choose the day
          node = <View style={[styles.day, styles.curr]}><TouchableOpacity onPress={this._onPressButton.bind(this, toDay)} activeOpacity={0.5}><Text style={[styles.dayText, { color: '#fff' }]}>{g}</Text></TouchableOpacity></View>
        }
        dayList.push(node)
      }
      content.push( // add node
        <View>
          <View style={styles.head}><Text>{moment(date).format('YYYY.MM')}</Text></View>
          <View style={styles.content}>
            {dayList}
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.weekContainer}>
          <Text style={[styles.weekText]}>Sun</Text>
          <Text style={styles.weekText}>Mon</Text>
          <Text style={styles.weekText}>Tue</Text>
          <Text style={styles.weekText}>Wed</Text>
          <Text style={styles.weekText}>Thu</Text>
          <Text style={styles.weekText}>Fri</Text>
          <Text style={[styles.weekText]}>Sat</Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}    
        >
          {content}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  weekContainer: {
    width: width,
    height: 35,
    backgroundColor: '#105eae',
    flexDirection: 'row',
    alignItems: 'center'
  },
  weekText: {
    width: width / 7,
    lineHeight: 35,
    textAlign: 'center',
    color: '#fff'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  day: {
    width: width / 7 - 0.1,
  },
  dayText: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: ((width / 7) - 20) * 0.5
  },
  startdayText: {
    textAlign: 'center',
    fontSize: 14
  },
  curr: {
    backgroundColor: '#105eae',
  },
  range: {
    backgroundColor: '#6CAFF5'
  },
  head: {
    alignItems: 'center',
    margin: 10
  },
  start: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14
  },
  btn: {
    width: width,
    height: 45,
    backgroundColor: '#105eae',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  }
})

App.defaultProps = {
  monthNum: 6, // 
  goliday: { 
    '2020-01-01': 'New Year',
    '2020-07-04': 'Independence Day',
    '2020-09-07': 'Labor Day ',
    '2020-10-12': 'Columbus Day',
    '2020-11-26': 'Thanksgiving Day'
  }
}